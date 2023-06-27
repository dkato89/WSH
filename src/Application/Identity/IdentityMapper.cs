using AutoMapper;
using Common.Security;
using Domain.Models;

namespace Application.ExchangeRate;

internal class IdentityMapper : Profile
{
    public IdentityMapper()
    {
        CreateMap<IUserDataProvider, UserLoginInfo>();
    }
}
