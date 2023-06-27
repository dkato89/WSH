using Common.Security;
using System.Security.Claims;

namespace WebUI.Security
{
    public class AspUserDataProvider : IUserDataProvider
    {
        public AspUserDataProvider(IHttpContextAccessor httpContextAccessor)
        {
            var claimsPrincipal = httpContextAccessor.HttpContext?.User;

            if (claimsPrincipal?.Identity?.IsAuthenticated == true)
            {
                UserId = Guid.Parse(claimsPrincipal.Claims.First(i => i.Type == CustomClaimTypes.UserId).Value);
                UserName = claimsPrincipal.Claims.First(i => i.Type == ClaimTypes.NameIdentifier.ToString()).Value;
                UserRoles = claimsPrincipal.Claims.Where(i => i.Type == ClaimTypes.Role).Select(s => s.Value);
                UserPermissions = claimsPrincipal.Claims.Where(i => i.Type == CustomClaimTypes.Permission).Select(s => s.Value);
            }
            else
            {
                throw new Exception("No authenticated user");
            }
        }

        public Guid UserId { get; private set; }

        public string UserName { get; private set; }

        public IEnumerable<string> UserRoles { get; private set; }

        public IEnumerable<string> UserPermissions { get; private set; }

        public bool HasPermission(string permission)
        {
            return UserPermissions?.Any(i => i == permission) == true;
        }
    }
}
