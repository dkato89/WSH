using Newtonsoft.Json;
using Domain.Exceptions;

namespace WebUI.Configurations;

public class HttpStatusCodeExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<HttpStatusCodeExceptionMiddleware> _logger;

    public HttpStatusCodeExceptionMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
    {
        _next = next ?? throw new ArgumentNullException(nameof(next));
        _logger = loggerFactory?.CreateLogger<HttpStatusCodeExceptionMiddleware>() ?? throw new ArgumentNullException(nameof(loggerFactory));
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch(IdentityErrorException ex)
        {
            _logger.LogError(ex, "IdentityErrorException");

            if (context.Response.HasStarted)
            {
                _logger.LogWarning("The response has already started, the http status code middleware will not be executed.");
                throw;
            }

            context.Response.Clear();
            context.Response.StatusCode = ex.StatusCode;
            context.Response.ContentType = @"application/json";

            await context.Response.WriteAsync(CreateResponseMessage("IDENTITYERROR", ex.Errors));
        }
        catch (FluentValidation.ValidationException valEx)
        {
            var ex = new RequestValidationException(valEx.Errors);

            _logger.LogError(ex, "ValidationException");

            if (context.Response.HasStarted)
            {
                _logger.LogWarning("The response has already started, the http status code middleware will not be executed.");
                throw;
            }

            context.Response.Clear();
            context.Response.StatusCode = ex.StatusCode;
            context.Response.ContentType = @"application/json";

            await context.Response.WriteAsync(CreateResponseMessage("VALIDATIONERROR", ex.ValidationMessages));
        }
        catch (HttpStatusCodeException ex)
        {
            _logger.LogError(ex, "HttpStatusCodeException");

            if (context.Response.HasStarted)
            {
                _logger.LogWarning("The response has already started, the http status code middleware will not be executed.");
                throw;
            }

            context.Response.Clear();
            context.Response.StatusCode = ex.StatusCode;
            context.Response.ContentType = @"application/json";

            await context.Response.WriteAsync(CreateResponseMessage(ex, ex.SkipErrorHandler));

            return;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception");

            if (context.Response.HasStarted)
            {
                _logger.LogWarning("The response has already started, the http status code middleware will not be executed.");
                throw;
            }

            context.Response.Clear();
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = @"application/json";

            await context.Response.WriteAsync(CreateResponseMessage(ex));

            return;
        }
    }

    private string CreateResponseMessage(Exception ex, bool? skipErrorHandler = null)
    {
        var response = new HttpErrorResponse { Error = ex.Message, SkipErrorHandler = skipErrorHandler };

        return JsonConvert.SerializeObject(response, new JsonSerializerSettings { ContractResolver = Common.Helpers.JsonSerializerSettings.GetContractResolver() });
    }

    private string CreateResponseMessage(string message, object details = null, bool? skipErrorHandler = null)
    {
        var response = new HttpErrorResponse { Error = message, Details = details, SkipErrorHandler = skipErrorHandler };

        return JsonConvert.SerializeObject(response, new JsonSerializerSettings { ContractResolver = Common.Helpers.JsonSerializerSettings.GetContractResolver() });
    }
}

public class HttpErrorResponse
{
    public string Error { get; set; }

    public object Details { get; set; }

    public bool? SkipErrorHandler { get; set; }
}
