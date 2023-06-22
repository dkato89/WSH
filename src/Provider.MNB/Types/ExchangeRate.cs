namespace Provider.MNB.Types;

public class ExchangeRate
{
    public required string Currency { get; set; }
    public int Unit { get; set; }

    public decimal RateValue { get; set; }
}
