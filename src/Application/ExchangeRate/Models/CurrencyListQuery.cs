using Domain.Models;
using MediatR;

namespace Application.ExchangeRate.Models;

public class CurrencyListQuery : IRequest<ListResult<string>>
{

}