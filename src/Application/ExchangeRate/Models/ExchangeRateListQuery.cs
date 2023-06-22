using MediatR;
using Provider.MNB.Types;

namespace Application.ExchangeRate.Models;

public class ExchangeRateListQuery : IRequest<IEnumerable<ExchangeRateDay>>
{
    public DateTime From { get; set; }
    public DateTime To { get; set; }

    public required IEnumerable<string> Currencies { get; set; }
}