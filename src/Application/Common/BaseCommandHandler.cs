using AutoMapper;
using Domain.Exceptions;
using FluentValidation;
using MediatR;

namespace Application.Common
{
    internal abstract class BaseCommandHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        protected readonly IValidator<TRequest> _validator;
        protected readonly IMapper _mapper;

        public BaseCommandHandler(IValidator<TRequest> validator, IMapper mapper)
        {
            _validator = validator;
            _mapper = mapper;
        }

        public Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken)
        {
            if (request == null)
                throw new RequestEmptyException();

            _validator.ValidateAndThrow(request);

            return HandleImpl(request, cancellationToken);
        }

        protected abstract Task<TResponse> HandleImpl(TRequest request, CancellationToken cancellationToken);
    }
}
