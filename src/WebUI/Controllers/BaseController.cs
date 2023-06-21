using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class BaseController : ControllerBase
{
    private ISender? _mediator;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

    protected Task<TResponse> Send<TResponse>(IRequest<TResponse> request) => Mediator.Send(request, HttpContext.RequestAborted);
}
