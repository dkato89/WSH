using Application.Identity.Models;
using FluentValidation;

namespace Application.User.Validators;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.UserName)
            .NotEmpty()
            .MaximumLength(256)
            .WithMessage(x => $"A felhasználónév vagy email nem lehet hosszabb mint 256 karakter. Amit megadtál {x.UserName.Length} hosszú");

        RuleFor(x => x.Password)
            .NotEmpty()
            .MaximumLength(32);
    }
}
