using Application.ExchangeRate.Models;
using Domain.Exceptions;
using Domain.Models;
using FluentValidation;
using MediatR;
using Provider.MNB;
using Provider.MNB.Types;

namespace Application.ExchangeRate.Queries;

public class ExchangeRateListQueryHandler : IRequestHandler<ExchangeRateListQuery, ListResult<ExchangeRateDay>>
{
    private readonly IValidator<ExchangeRateListQuery> _validator;
    private readonly IMNBExchangeRateService _exchangeRateService;

    public ExchangeRateListQueryHandler(IMNBExchangeRateService exchangeRateService, IValidator<ExchangeRateListQuery> validator)
    {
        _exchangeRateService = exchangeRateService;
        _validator = validator;
    }

    public async Task<ListResult<ExchangeRateDay>> Handle(ExchangeRateListQuery request, CancellationToken cancellationToken)
    {
        if (request == null)
            throw new RequestEmptyException();

        _validator.ValidateAndThrow(request);

        var result = await _exchangeRateService.GetExchangeRatesAsync(request.From, request.To, request.Currencies.ToArray());

        return new ListResult<ExchangeRateDay>(result);
    }
}
