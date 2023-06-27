using MediatR;

namespace Application.Identity.Models;

public class LoginRequest : IRequest<TokenResult>
{
    public required string UserName { get; set; }

    public required string Password { get; set; }
}
