using System.Xml.Serialization;

namespace Provider.MNB.ServiceResponseTypes;

[XmlRoot("MNBCurrencies")]
internal class MNBCurrencies
{
    [XmlElement("Currencies")]
    public CurrencyArray? Currencies { get; set; }
}

internal class CurrencyArray
{
    [XmlElement("Curr")]
    public List<string>? Currencies { get; set; }
}
