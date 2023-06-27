using Domain.Models;
using MediatR;
using Provider.MNB.Types;

namespace Application.ExchangeRate.Models;

public class ExchangeRateListQuery : IRequest<ListResult<ExchangeRateDay>>
{
    public DateTime From { get; set; }
    public DateTime To { get; set; }

    public required IEnumerable<string> Currencies { get; set; }
}