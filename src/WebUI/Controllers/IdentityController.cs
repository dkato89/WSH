using Microsoft.AspNetCore.Mvc;
using Application.User.Models;
using Application.Identity.Models;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;

namespace WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : BaseController
    {
        [HttpPost("Login")]
        [ProducesResponseType(typeof(TokenResult), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var response = await Send(model);

            return Ok(response);
        }

        [HttpPost("RegisterUser")]
        [ProducesResponseType(typeof(RegisterUserResult), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserRequest model)
        {
            var response = await Send(model);

            return Ok(response);
        }

        [Authorize]
        [HttpGet("GetCurrentLoginInformations")]
        [ProducesResponseType(typeof(CurrentLoginInformations), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCurrentLoginInformations()
        {
            var response = await Send(new CurrentLoginInformationsRequest());

            return Ok(response);
        }
    }
}
