using System.ComponentModel.DataAnnotations;

namespace WebUI.Models
{
    public class RegisterUserModel: AuthenticateModel
    {
        [Required]
        [StringLength(32)]
        public required string ConfirmationPassword { get; set; }
    }
}
