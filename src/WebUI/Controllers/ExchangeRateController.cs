using Application.ExchangeRate.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    [Route("api/[controller]")]
    public class ExchangeRateController: BaseController
    {
        [HttpGet]
        [Route("list")]
        [ProducesResponseType(typeof(List<ExchangeRateViewModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> ListExchangeRates()
        {
            var response = await Send(new ExchangeRateListQuery());
            return Ok(response);
        }
    }
}