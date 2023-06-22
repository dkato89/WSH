using MediatR;

namespace Application.User.Models;

public class RegisterUserRequest: IRequest<RegisterUserResult>
{
    public required string UserNameOrEmailAddress { get; set; }

    public required string Password { get; set; }

    public required string PasswordConfirmation { get; set; }
}
