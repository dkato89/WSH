namespace Common.Configuration;

public class AppSettings : IAppSettings
{
    public required MNBServiceSettings MNBServiceSettings { get; set; }
}