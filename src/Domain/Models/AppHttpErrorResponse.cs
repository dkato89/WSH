namespace Domain.Models;

public class AppHttpErrorResponse
{
    public string Error { get; set; }

    public object Details { get; set; }

    public bool? SkipErrorHandler { get; set; }
}
