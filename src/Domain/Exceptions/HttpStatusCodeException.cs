using System.Net;

namespace Domain.Exceptions;

public class HttpStatusCodeException : Exception
{
    public int StatusCode { get; set; }

    public bool? SkipErrorHandler { get; set; }


    public HttpStatusCodeException()
    {
        StatusCode = (int)HttpStatusCode.BadRequest;
    }

    public HttpStatusCodeException(int statusCode)
    {
        StatusCode = statusCode;
    }

    public HttpStatusCodeException(int statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
    }
}
