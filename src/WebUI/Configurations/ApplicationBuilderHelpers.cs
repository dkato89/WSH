using Microsoft.EntityFrameworkCore;
using Persistence;

namespace WebUI.Configurations
{
    public static class ApplicationBuilderHelpers
    {
        public static IApplicationBuilder UseHttpStatusCodeExceptionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<HttpStatusCodeExceptionMiddleware>();
        }

        public static void DbMigrate(this IApplicationBuilder applicationBuilder)
        {
            var scopeFactory = applicationBuilder.ApplicationServices.GetService<IServiceScopeFactory>();
            using (var scope = scopeFactory.CreateScope())
            {
                AppDbContext context = scope.ServiceProvider.GetService<AppDbContext>();

                context.Database.Migrate();
            }
        }
    }
}
