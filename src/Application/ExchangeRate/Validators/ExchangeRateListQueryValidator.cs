using Application.ExchangeRate.Models;
using FluentValidation;

namespace Application.User.Validators;

public class ExchangeRateListQueryValidator : AbstractValidator<ExchangeRateListQuery>
{
    public ExchangeRateListQueryValidator()
    {
        RuleFor(x => x.From)
            .LessThan(x => x.To);

        RuleFor(x => x.Currencies)
            .NotEmpty();
    }
}
