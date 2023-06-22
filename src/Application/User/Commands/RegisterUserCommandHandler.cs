using Application.Common;
using Application.User.Models;
using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace Application.User.Commands;

internal class RegisterUserCommandHandler : BaseCommandHandler<RegisterUserRequest, RegisterUserResult>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public RegisterUserCommandHandler(IValidator<RegisterUserRequest> validator, IMapper mapper, UserManager<ApplicationUser> userManager) 
        : base(validator, mapper)
    {
        _userManager = userManager;
    }

    protected async override Task<RegisterUserResult> HandleImpl(RegisterUserRequest request, CancellationToken cancellationToken)
    {
        var newUser = _mapper.Map<RegisterUserRequest, ApplicationUser>(request);

        var result = await _userManager.CreateAsync(newUser, request.Password);

        if (!result.Succeeded)
            throw new IdentityErrorException(result.Errors);

        string userId = await _userManager.GetUserIdAsync(newUser);

        return new RegisterUserResult(userId);
    }
}
