using AutoMapper;
using Provider.MNB.ServiceResponseTypes;
using Provider.MNB.Types;

namespace Provider.MNB;

public class MNBProviderMapper : Profile
{
    public MNBProviderMapper()
    {
        CreateMap<Day, ExchangeRateDay>();

        CreateMap<Rate, ExchangeRate>();
    }
}
