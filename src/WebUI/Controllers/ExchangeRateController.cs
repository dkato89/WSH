using Application.ExchangeRate.Models;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Provider.MNB.Types;

namespace WebUI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ExchangeRateController: BaseController
    {
        [HttpPost("List")]
        [ProducesResponseType(typeof(ListResult<ExchangeRateDay>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListExchangeRates([FromBody] ExchangeRateListQuery model)
        {
            var response = await Send(model);
            return Ok(response);
        }

        [HttpGet("CurrentList")]
        [ProducesResponseType(typeof(ExchangeRateDay), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListCurrentExchangeRates()
        {
            var response = await Send(new CurrentExchangeRateListQuery());

            return Ok(response);
        }

        [HttpGet("ListCurrencies")]
        [ProducesResponseType(typeof(ListResult<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListCurrencies()
        {
            var response = await Send(new CurrencyListQuery());

            return Ok(response);
        }

        [HttpPost("ChangeCurrencyRateFromHUF")]
        [ProducesResponseType(typeof(ChangeCurrencyRateResult), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppHttpErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ChangeCurrencyRateFromHUF([FromBody] ChangeCurrencyRateRequest model)
        {
            var response = await Send(model);
            return Ok(response);
        }
    }
}