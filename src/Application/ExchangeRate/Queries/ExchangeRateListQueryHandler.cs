using Application.ExchangeRate.Models;
using MediatR;

namespace Application.ExchangeRate.Queries;

public class ExchangeRateListQueryHandler : IRequestHandler<ExchangeRateListQuery, List<ExchangeRateViewModel>>
{
    public Task<List<ExchangeRateViewModel>> Handle(ExchangeRateListQuery request, CancellationToken cancellationToken)
    {
        var result = new List<ExchangeRateViewModel>
        {
            new ExchangeRateViewModel { Date = DateTime.Today },
            new ExchangeRateViewModel { Date = DateTime.Today.AddDays(-1) }
        };

        return Task.FromResult(result);
    }
}
