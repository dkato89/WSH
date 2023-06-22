using MediatR;

namespace Application.ExchangeRate.Models;

public class CurrencyListQuery : IRequest<IEnumerable<string>>
{

}