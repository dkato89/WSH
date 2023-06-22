namespace Common.Configuration;

public interface IJwtSettings
{
    string Issuer { get; }
    string Audience { get; }
    string Key { get;}

    int ExpirationTimeInMinutes { get; }
}
