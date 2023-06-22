using Application.ExchangeRate.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Provider.MNB.Types;
using WebUI.Configurations;

namespace WebUI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ExchangeRateController: BaseController
    {
        [HttpPost("List")]
        [ProducesResponseType(typeof(List<ExchangeRateDay>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListExchangeRates([FromBody] ExchangeRateListQuery model)
        {
            var response = await Send(model);
            return Ok(response);
        }

        [HttpGet("CurrentList")]
        [ProducesResponseType(typeof(ExchangeRateDay), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListCurrentExchangeRates()
        {
            var response = await Send(new CurrentExchangeRateListQuery());

            return Ok(response);
        }
    }
}