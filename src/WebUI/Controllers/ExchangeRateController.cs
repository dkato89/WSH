using Application.ExchangeRate.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ExchangeRateController: BaseController
    {
        [HttpGet("List")]
        [ProducesResponseType(typeof(List<ExchangeRateViewModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> ListExchangeRates()
        {
            var response = await Send(new ExchangeRateListQuery());
            return Ok(response);
        }
    }
}