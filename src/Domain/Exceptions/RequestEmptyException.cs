namespace Domain.Exceptions;

public class RequestEmptyException : BadRequestException
{
    public RequestEmptyException() :
        base("Request is empty")
    {

    }
}
