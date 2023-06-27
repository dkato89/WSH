using System.Xml.Serialization;

namespace Provider.MNB.ServiceResponseTypes;

[XmlRoot("MNBCurrencies")]
public class MNBCurrencies
{
    [XmlElement("Currencies")]
    public CurrencyArray? Currencies { get; set; }
}

public class CurrencyArray
{
    [XmlElement("Curr")]
    public List<string>? Currencies { get; set; }
}
