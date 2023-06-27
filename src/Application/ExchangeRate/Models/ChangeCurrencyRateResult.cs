namespace Application.ExchangeRate.Models;

public class ChangeCurrencyRateResult
{
    public decimal Amount { get; set; }

    public required string Currency { get; set; }

    public decimal Rate { get; set; }

    public DateTime Date { get; set; }
}
