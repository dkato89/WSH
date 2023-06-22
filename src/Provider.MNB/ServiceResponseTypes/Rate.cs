using System.Xml.Serialization;

namespace Provider.MNB.ServiceResponseTypes;

public class Rate
{
    [XmlAttribute("curr")]
    public string Currency { get; set; }

    [XmlAttribute("unit")]
    public int Unit { get; set; }

    [XmlIgnore]
    public decimal RateValue { get; set; }

    [XmlText]
    public string RateValueSerialized
    {
        get
        {
            return RateValue.ToString();
        }
        set
        {
            decimal decimalValue;
            Decimal.TryParse(value, out decimalValue);
            RateValue = decimalValue;
        }
    }
}
