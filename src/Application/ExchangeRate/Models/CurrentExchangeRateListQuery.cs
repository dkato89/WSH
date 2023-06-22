using MediatR;
using Provider.MNB.Types;

namespace Application.ExchangeRate.Models;

public class CurrentExchangeRateListQuery : IRequest<ExchangeRateDay>
{
}