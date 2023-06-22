using Domain.Models;
using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;

namespace Domain.Exceptions;

public class RequestValidationException : BadRequestException
{
    public List<ValidationMessage> ValidationMessages { get; set; }

    public RequestValidationException(List<ValidationMessage> errors)
        : base()
    {
        ValidationMessages = errors;
    }

    public RequestValidationException(IEnumerable<ValidationFailure> errors)
        : base()
    {
        ValidationMessages = errors.Select(s => new ValidationMessage
        {
            PropertyName = Common.Helpers.JsonSerializerSettings.ResolvePropertyName(s.PropertyName),
            Message = s.ErrorMessage
        }).ToList();
    }

    public RequestValidationException(string propertyName, string message)
        : base()
    {
        ValidationMessages = new List<ValidationMessage>
        {
            new ValidationMessage
            {
                PropertyName = Common.Helpers.JsonSerializerSettings.ResolvePropertyName(propertyName),
                Message = message
            }
        };
    }
}
