using Provider.MNB.Types;

namespace Provider.MNB;

public interface IMNBExchangeRateService
{
    Task<ExchangeRateDay> GetCurrentExchangeRatesAsync();

    Task<IEnumerable<ExchangeRateDay>> GetExchangeRatesAsync(DateTime startDate, DateTime? endDate, string[] currencyNames);

    Task<IEnumerable<string>?> GetCurrenciesAsync();
}
