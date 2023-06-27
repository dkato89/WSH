namespace Common.Security
{
    public interface IUserDataProvider
    {
        Guid UserId { get; }

        string UserName { get; }

        IEnumerable<string> UserRoles { get; }

        bool HasPermission(string permission);
    }
}
