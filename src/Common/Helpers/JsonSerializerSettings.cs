using Newtonsoft.Json.Serialization;

namespace Common.Helpers;

public static class JsonSerializerSettings
{
    public static DefaultContractResolver GetContractResolver()
    {
        return new CamelCasePropertyNamesContractResolver();
    }

    public static string ResolvePropertyName(string propertyName)
    {
        var resolver = GetContractResolver();
        return resolver.GetResolvedPropertyName(propertyName);
    }
}
