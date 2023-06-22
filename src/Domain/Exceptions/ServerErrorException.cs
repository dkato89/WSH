namespace Domain.Exceptions;

public class ServerErrorException : HttpStatusCodeException
{
    public ServerErrorException(string message)
        : base(500, message)
    {

    }
}
