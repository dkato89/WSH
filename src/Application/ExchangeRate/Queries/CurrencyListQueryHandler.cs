using Application.ExchangeRate.Models;
using MediatR;
using Provider.MNB;

namespace Application.ExchangeRate.Queries;

internal class CurrencyListQueryHandler : IRequestHandler<CurrencyListQuery, IEnumerable<string>>
{
    private readonly IMNBExchangeRateService _exchangeRateService;

    public CurrencyListQueryHandler(IMNBExchangeRateService exchangeRateService)
    {
        _exchangeRateService = exchangeRateService;
    }

    public async Task<IEnumerable<string>> Handle(CurrencyListQuery request, CancellationToken cancellationToken) => 
        await _exchangeRateService.GetCurrenciesAsync();
}
