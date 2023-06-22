using Microsoft.AspNetCore.Mvc;
using Application.User.Models;
using Application.Identity.Models;
using WebUI.Configurations;

namespace WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : BaseController
    {
        [HttpPost("Login")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpErrorResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var response = await Send(model);

            return Ok(response);
        }

        [HttpPost("RegisterUser")]
        [ProducesResponseType(typeof(RegisterUserResult), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpErrorResponse), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserRequest model)
        {
            var response = await Send(model);

            return Ok(response);
        }
    }
}
