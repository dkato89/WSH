using System.ComponentModel.DataAnnotations;

namespace WebUI.Models;

public class AuthenticateModel
{
    [Required]
    [StringLength(256)]
    public required string UserNameOrEmailAddress { get; set; }

    [Required]
    [StringLength(32)]
    public required string Password { get; set; }
}
