using Autofac;
using Provider.MNB;

namespace Application;

public class ApplicationModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        builder.RegisterType<MNBExchangeRateService>().As<IMNBExchangeRateService>();
    }
}
