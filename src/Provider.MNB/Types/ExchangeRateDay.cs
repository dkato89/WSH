namespace Provider.MNB.Types;

public class ExchangeRateDay
{
    public IEnumerable<ExchangeRate>? Rates { get; set; }

    public DateTime Date { get; set; }
}
