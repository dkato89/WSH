using Application.ExchangeRate.Models;
using FluentValidation;

namespace Application.ExchangeRate.Validators;

public class ChangeCurrencyRateRequestValidator : AbstractValidator<ChangeCurrencyRateRequest>
{
    public ChangeCurrencyRateRequestValidator()
    {
        RuleFor(x => x.TargetCurrency)
            .NotEmpty()
            .NotEqual("HUF")
            .Length(3);

        RuleFor(x => x.Amount)
            .GreaterThan(0);
    }
}
