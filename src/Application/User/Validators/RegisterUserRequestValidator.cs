using Application.User.Models;
using FluentValidation;

namespace Application.User.Validators;

public class RegisterUserRequestValidator : AbstractValidator<RegisterUserRequest>
{
    public RegisterUserRequestValidator()
    {
        RuleFor(x => x.UserNameOrEmailAddress)
            .NotEmpty()
            .MaximumLength(256)
            .WithMessage(x => $"A felhasználónév vagy email nem lehet hosszabb mint 256 karakter. Amit megadtál {x.UserNameOrEmailAddress.Length} hosszú");

        RuleFor(x => x.PasswordConfirmation)
            .NotEmpty()
            .MaximumLength(32);

        RuleFor(x => x.Password)
            .NotEmpty()
            .MaximumLength(32)
            .Equal(x => x.PasswordConfirmation)
            .WithMessage(x => "A megadott jelszó mező értékek nem egyeznek");
    }
}
