namespace Common.Configuration;

public class JwtSettings : IJwtSettings
{
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public string Key { get; set; }

    public int ExpirationTimeInMinutes { get; set; }
}
