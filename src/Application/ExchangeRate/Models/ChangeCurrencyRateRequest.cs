using MediatR;

namespace Application.ExchangeRate.Models;

public class ChangeCurrencyRateRequest : IRequest<ChangeCurrencyRateResult>
{
    public required string TargetCurrency { get; set; }

    public decimal Amount { get; set; }
}
