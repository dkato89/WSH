using AutoMapper;
using MNBServiceReference;
using Provider.MNB.ServiceResponseTypes;
using Provider.MNB.Types;
using System.Xml.Serialization;

namespace Provider.MNB;

public class MNBExchangeRateService: IMNBExchangeRateService
{
    private readonly MNBArfolyamServiceSoapClient _client;
    private readonly IMapper _mapper;
    public MNBExchangeRateService(IMapper mapper)
    {
        _client = new MNBArfolyamServiceSoapClient();
        _mapper = mapper;
    }

    public async Task<ExchangeRateDay> GetCurrentExchangeRatesAsync()
    {
        var response = await this._client.GetCurrentExchangeRatesAsync(new GetCurrentExchangeRatesRequestBody());

        var rawResponse = response?.GetCurrentExchangeRatesResponse1?.GetCurrentExchangeRatesResult;

        XmlSerializer xmlSerializer = new XmlSerializer(typeof(MnbCurrentExchangeRates));

        MnbCurrentExchangeRates? result = xmlSerializer.Deserialize(new StringReader(rawResponse)) as MnbCurrentExchangeRates;

        return _mapper.Map<ExchangeRateDay>(result?.Day);
    }

    public async Task<IEnumerable<ExchangeRateDay>?> GetExchangeRatesAsync(DateTime startDate, DateTime? endDate, string[] currencyNames)
    {
        if (currencyNames == null || currencyNames.Length == 0)
            throw new ArgumentNullException("currencyNames");

        if (!endDate.HasValue)
            endDate = DateTime.Today;

        string currencyNamesString = string.Join(",", currencyNames);

        var request = new GetExchangeRatesRequestBody { 
            startDate= startDate.ToString("yyyy-MM-dd"), 
            endDate= endDate.Value.ToString("yyyy-MM-dd"), 
            currencyNames= currencyNamesString
        };

        var response = await _client.GetExchangeRatesAsync(request);
        var rawResponse = response.GetExchangeRatesResponse1.GetExchangeRatesResult;

        XmlSerializer xmlSerializer = new XmlSerializer(typeof(MnbExchangeRates));

        MnbExchangeRates? result = xmlSerializer.Deserialize(new StringReader(rawResponse)) as MnbExchangeRates;

        if(!string.IsNullOrWhiteSpace(result?.Error))
            throw new Exception(result.Error);

        return _mapper.Map<IEnumerable<ExchangeRateDay>>(result?.Days);
    }

    public async Task<IEnumerable<string>?> GetCurrenciesAsync()
    {
        var response = await this._client.GetCurrenciesAsync(new GetCurrenciesRequestBody());

        var rawResponse = response?.GetCurrenciesResponse1.GetCurrenciesResult;

        XmlSerializer xmlSerializer = new XmlSerializer(typeof(MNBCurrencies));

        MNBCurrencies? result = xmlSerializer.Deserialize(new StringReader(rawResponse)) as MNBCurrencies;

        return result?.Currencies?.Currencies;
    }
}
