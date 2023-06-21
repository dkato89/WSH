using MediatR;

namespace Application.ExchangeRate.Models;

public class ExchangeRateListQuery : IRequest<List<ExchangeRateViewModel>>
{

}