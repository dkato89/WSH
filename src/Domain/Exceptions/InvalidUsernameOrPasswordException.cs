namespace Domain.Exceptions;

public class InvalidUsernameOrPasswordException : BadRequestException
{
    public InvalidUsernameOrPasswordException()
        : base("msg.errors.InvalidUsernameOrPassword")
    {
        SkipErrorHandler = true;
    }
}
