namespace WebUI.Models;

public class AuthenticateResultModel
{
    public required string AccessToken { get; set; }

    public required string EncryptedAccessToken { get; set; }

    public int ExpireInSeconds { get; set; }

    public long UserId { get; set; }
}
