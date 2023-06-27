using Application.ExchangeRate.Models;
using Domain.Models;
using MediatR;
using Provider.MNB;

namespace Application.ExchangeRate.Queries;

internal class CurrencyListQueryHandler : IRequestHandler<CurrencyListQuery, ListResult<string>>
{
    private readonly IMNBExchangeRateService _exchangeRateService;
    

    public CurrencyListQueryHandler(IMNBExchangeRateService exchangeRateService)
    {
        _exchangeRateService = exchangeRateService;
    }

    public async Task<ListResult<string>> Handle(CurrencyListQuery request, CancellationToken cancellationToken)
    {
        var items = await _exchangeRateService.GetCurrenciesAsync();

        return new ListResult<string>(items);
    }
}
