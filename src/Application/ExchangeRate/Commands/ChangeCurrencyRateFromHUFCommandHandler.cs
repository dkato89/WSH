using Application.Common;
using Application.ExchangeRate.Models;
using AutoMapper;
using FluentValidation;
using Provider.MNB;

namespace Application.ExchangeRate.Commands;

public class ChangeCurrencyRateFromHUFCommandHandler : BaseCommandHandler<ChangeCurrencyRateRequest, ChangeCurrencyRateResult>
{
    private readonly IMNBExchangeRateService _exchangeRateService;

    public ChangeCurrencyRateFromHUFCommandHandler(IValidator<ChangeCurrencyRateRequest> validator, IMapper mapper, IMNBExchangeRateService exchangeRateService)
        : base(validator, mapper)
    {
        this._exchangeRateService = exchangeRateService;
    }

    protected override async Task<ChangeCurrencyRateResult> HandleImpl(ChangeCurrencyRateRequest request, CancellationToken cancellationToken)
    {
        var currentExchangeRates = await _exchangeRateService.GetCurrentExchangeRatesAsync();

        if (currentExchangeRates == null)
            throw new ArgumentNullException(nameof(currentExchangeRates));

        if (currentExchangeRates.Rates == null || currentExchangeRates.Rates.Count() == 0)
            throw new ArgumentNullException(nameof(currentExchangeRates.Rates));

        var targetCurrencyRate = currentExchangeRates.Rates.SingleOrDefault(i => i.Currency == request.TargetCurrency)
            ?? throw new Exception($"Unknown Target Currency [{request.TargetCurrency}]");

        var result = new ChangeCurrencyRateResult
        {
            Date = currentExchangeRates.Date,
            Amount = decimal.Round(request.Amount / targetCurrencyRate.RateValue, 2),
            Rate = targetCurrencyRate.RateValue,
            Currency = targetCurrencyRate.Currency
        };

        return result;
    }
}
