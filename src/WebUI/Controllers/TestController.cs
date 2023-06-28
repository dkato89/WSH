using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet()]
    public IActionResult Check()
    {
        return Ok("OK");
    }
}
