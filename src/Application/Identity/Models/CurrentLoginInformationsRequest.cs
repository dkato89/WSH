using Domain.Models;
using MediatR;

namespace Application.Identity.Models;

public class CurrentLoginInformationsRequest : IRequest<CurrentLoginInformations>
{
}
