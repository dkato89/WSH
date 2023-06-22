using System.Globalization;
using System.Xml.Serialization;

namespace Provider.MNB.ServiceResponseTypes;

public class Day
{
    [XmlElement("Rate")]
    public List<Rate>? Rates { get; set; }

    [XmlIgnore]
    public DateTime Date { get; set; }

    [XmlAttribute("date")]
    public string DateSerialized
    {
        get
        {
            return Date.ToString("yyyy-MM-dd");
        }
        set
        {
            Date = DateTime.ParseExact(value, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        }
    }
}
