using Microsoft.AspNetCore.Identity;

namespace Domain.Exceptions;

public class IdentityErrorException : BadRequestException
{
    public IEnumerable<IdentityError> Errors { get; set; }

    public IdentityErrorException(IEnumerable<IdentityError> errors) :
        base("IDENTITYERROR")
    {
        Errors = errors;
    }
}
