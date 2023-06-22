namespace Application.User.Models;

public class RegisterUserResult
{
    public RegisterUserResult() { }
    public RegisterUserResult(string id)
    {
        Id = new Guid(id);
    }

    public Guid Id { get; set; }
}
