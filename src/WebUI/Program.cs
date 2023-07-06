using Application;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper.Contrib.Autofac.DependencyInjection;
using Common.Configuration;
using FluentValidation;
using MediatR.Extensions.Autofac.DependencyInjection;
using MediatR.Extensions.Autofac.DependencyInjection.Builder;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Serilog;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;
using WebUI.Configurations;
using Provider.MNB;
using WebUI.Security;
using Common.Security;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;
AppSettings appSettings = config.GetSection("App").Get<AppSettings>();
JwtSettings jwtSettings = config.GetSection("JwtSettings").Get<JwtSettings>();

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
{
    containerBuilder.RegisterModule<ApplicationModule>();

    containerBuilder.RegisterType<ConfigureSwaggerOptions>().As<IConfigureOptions<SwaggerGenOptions>>();

    containerBuilder.RegisterInstance(appSettings).As<IAppSettings>().SingleInstance();
    containerBuilder.RegisterInstance(jwtSettings).As<IJwtSettings>().SingleInstance();

    containerBuilder.RegisterType<AspUserDataProvider>().As<IUserDataProvider>();

    containerBuilder.RegisterAutoMapper(true, typeof(ApplicationModule).Assembly, typeof(MNBProviderMapper).Assembly);

    var mediatrConfiguration = MediatRConfigurationBuilder
            .Create(typeof(ApplicationModule).Assembly)
            .WithAllOpenGenericHandlerTypesRegistered()
            .Build();

    containerBuilder.RegisterMediatR(mediatrConfiguration);
});

builder.Services.ConfigureIdentity();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(config.GetConnectionString(AppConsts.ConnectionStringName)));

builder.Services.ConfigureJwtAuthentication(jwtSettings);

builder.Services.AddControllers();

builder.Services.AddSpaStaticFiles(configuration =>
    configuration.RootPath = "ClientApp/dist");

var logger = new LoggerConfiguration()
  .ReadFrom.Configuration(builder.Configuration)
  .Enrich.FromLogContext()
  .CreateLogger();
builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

logger.Information(config.GetConnectionString(AppConsts.ConnectionStringName));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();

builder.Services.AddValidatorsFromAssemblyContaining<Application.User.Validators.RegisterUserRequestValidator>();

builder.Services.ConfCors();

var app = builder.Build();
logger.Debug("IsDev: " + app.Environment.IsDevelopment());
if (app.Environment.IsDevelopment())
{
    app.UseCors("CorsPolicy");

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

if (!app.Environment.IsDevelopment())
    app.UseSpaStaticFiles();

app.UseHttpStatusCodeExceptionMiddleware();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("healthcheck", ()=> Results.Ok("OK"));

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";

    if (app.Environment.IsDevelopment())
    {
        spa.UseProxyToSpaDevelopmentServer(config["SpaBaseUrl"] ?? "http://localhost:4200");
    }
});

app.DbMigrate();

app.Run();