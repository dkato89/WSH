using System.Xml.Serialization;

namespace Provider.MNB.ServiceResponseTypes;

[XmlRoot("MNBCurrentExchangeRates")]
public class MnbCurrentExchangeRates
{
    [XmlElement("Day")]
    public required Day Day { get; set; }
}
