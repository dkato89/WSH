using System.Net;

namespace Domain.Exceptions;

public class BadRequestException : HttpStatusCodeException
{
    public BadRequestException()
    : base(400)
    {

    }

    public BadRequestException(string message)
        : base(400, message)
    {

    }
}
