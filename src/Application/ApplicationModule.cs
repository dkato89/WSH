using Autofac;

namespace Application;

public class ApplicationModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        //builder.RegisterType<PKRRepository>().As<IPKRRepository>();
    }
}
