using Application.User.Models;
using AutoMapper;
using Domain.Entities;

namespace Application.ExchangeRate;

internal class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<RegisterUserRequest, ApplicationUser>()
            .ForMember(dto => dto.UserName, conf => conf.MapFrom(ol => ol.UserNameOrEmailAddress))
            ;
    }
}
