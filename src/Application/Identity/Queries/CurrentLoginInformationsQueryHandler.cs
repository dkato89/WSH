using Application.Identity.Models;
using AutoMapper;
using Common;
using Common.Security;
using Domain.Models;
using MediatR;

namespace Application.Identity.Queries;

public class CurrentLoginInformationsQueryHandler : IRequestHandler<CurrentLoginInformationsRequest, CurrentLoginInformations>
{
    private readonly IUserDataProvider _userDataProvider;
    private readonly IMapper _mapper;

    public CurrentLoginInformationsQueryHandler(IUserDataProvider userDataProvider, IMapper mapper)
    {
        _userDataProvider = userDataProvider;
        _mapper = mapper;
    }

    public Task<CurrentLoginInformations> Handle(CurrentLoginInformationsRequest request, CancellationToken cancellationToken)
    {
        var result = new CurrentLoginInformations
        {
            User = _mapper.Map<UserLoginInfo>(_userDataProvider),
            Application = new ApplicationInfo
            {
                Version = AppVersionHelper.Version,
                ReleaseDate = AppVersionHelper.ReleaseDate
            }
        };

        return Task.FromResult(result);
    }
}
