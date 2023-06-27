namespace Domain.Models;

public class UserLoginInfo
{
    public Guid UserId { get; set; }
    public required string UserName { get; set; }

    public string? EmailAddress { get; set; }
}
