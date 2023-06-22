using System.Xml.Serialization;

namespace Provider.MNB.ServiceResponseTypes;

[XmlRoot("MNBExchangeRates")]
public class MnbExchangeRates
{
    [XmlElement("Day")]
    public List<Day>? Days { get; set; }

    [XmlElement("Error")]
    public string? Error { get; set; }
}
