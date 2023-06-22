using Application.ExchangeRate.Models;
using Domain.Exceptions;
using MediatR;
using Provider.MNB;
using Provider.MNB.Types;

namespace Application.ExchangeRate.Queries;

public class CurrentExchangeRateListQueryHandler : IRequestHandler<CurrentExchangeRateListQuery, ExchangeRateDay>
{
    private readonly IMNBExchangeRateService _exchangeRateService;

    public CurrentExchangeRateListQueryHandler(IMNBExchangeRateService exchangeRateService)
    {
        _exchangeRateService = exchangeRateService;
    }

    public async Task<ExchangeRateDay> Handle(CurrentExchangeRateListQuery request, CancellationToken cancellationToken)
    {
        if (request == null)
            throw new RequestEmptyException();

        var result = await _exchangeRateService.GetCurrentExchangeRatesAsync();
        
        return result;
    }
}
