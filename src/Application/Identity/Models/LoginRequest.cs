using Application.User.Models;
using MediatR;

namespace Application.Identity.Models;

public class LoginRequest : IRequest<string>
{
    public required string UserName { get; set; }

    public required string Password { get; set; }
}
