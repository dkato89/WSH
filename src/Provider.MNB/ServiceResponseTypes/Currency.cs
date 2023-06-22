using System.Xml.Serialization;

namespace Provider.MNB.ServiceResponseTypes;

[XmlRoot("Curr")]
public class Currency
{
    [XmlText]
    public string Code { get; set; }
}
