using Application.Common;
using Application.Identity.Models;
using AutoMapper;
using Common.Configuration;
using Common.Security;
using Domain.Entities;
using Domain.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Application.Identity.Commands;

public class LoginCommandHandler : BaseCommandHandler<LoginRequest, TokenResult>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtSettings _jwtSettings;

    public LoginCommandHandler(IValidator<LoginRequest> validator, IMapper mapper, UserManager<ApplicationUser> userManager, IJwtSettings jwtSettings)
        : base(validator, mapper)
    {
        _userManager = userManager;
        _jwtSettings = jwtSettings;
    }

    protected override async Task<TokenResult> HandleImpl(LoginRequest request, CancellationToken cancellationToken)
    {
        ApplicationUser user = await _userManager.FindByNameAsync(request.UserName);

        if (user == null)
            throw new InvalidUsernameOrPasswordException();

        bool isPwdValid = await _userManager.CheckPasswordAsync(user, request.Password);
        if (!isPwdValid)
            throw new InvalidUsernameOrPasswordException();

        var encodedJwt = await GenerateTokenAsync(user);

        return new TokenResult { Token = encodedJwt };
    }

    private async Task<string> GenerateTokenAsync(ApplicationUser user)
    {
        var now = DateTime.UtcNow;
        List<Claim> claims = new()
        {
            new Claim(CustomClaimTypes.UserId, user.Id.ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
        };

        var userClaims = await _userManager.GetClaimsAsync(user);
        claims.AddRange(userClaims);

        var secretKey = _jwtSettings.Key;
        var issuer = _jwtSettings.Issuer;
        var audience = _jwtSettings.Audience;
        var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
        var expiration = TimeSpan.FromMinutes(_jwtSettings.ExpirationTimeInMinutes);

        var jwt = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            notBefore: now,
            expires: now.Add(expiration),
            signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256));

        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        return encodedJwt;
    }
}
