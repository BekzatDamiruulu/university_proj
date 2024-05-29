using System.Text.Json;
using UniversitySolution.BusinessLogic.Common;

namespace UniversitySolution.BusinessLogic.Utils;

public static class JsonDeserializer
{
    public static List<FilterObject> ToFilterObjectsList(string filter)
    {
        var filterObjects = new List<FilterObject>();
        var rootElement = JsonDocument.Parse(filter).RootElement;
        if (rootElement.ValueKind == JsonValueKind.Array)
        {
            filterObjects.AddRange(rootElement.EnumerateArray().Select(rootObject => ToFilterObject(rootObject)));
            return filterObjects;
        }
        filterObjects.Add(ToFilterObject(rootElement));
        return filterObjects;
    }

    private static FilterObject ToFilterObject(JsonElement rootElement)
    {
        var filterBy = rootElement.GetProperty("filterBy").GetString();
        var filterValue = rootElement.GetProperty("filterValue");
        object? value = null;
        switch (filterValue.ValueKind)
        {
            case JsonValueKind.Number:
                if (filterValue.TryGetInt64(out var number))
                    value = number;
                break;
            case JsonValueKind.String:
                var trimmedValue = filterValue.GetRawText().Trim('"');
                if (Int64.TryParse(trimmedValue, out var outNumber))
                {
                    value = outNumber;
                    break;
                }

                value = filterValue;
                break;
            case JsonValueKind.Null:
                value = null;
                break;
            case JsonValueKind.Undefined:
            case JsonValueKind.Object:
            case JsonValueKind.Array:
            case JsonValueKind.True:
            case JsonValueKind.False:
            default:
                value = null;
                break;
        }

        var filterConditions = rootElement.GetProperty("filterConditions");
        if (filterConditions.ValueKind != JsonValueKind.Array)
        {
            throw new Exception("filterconditions must be array !");
        }

        var listConditions = (from element in filterConditions.EnumerateArray()
            where element.GetString() != null
            select element.GetString()!).ToList();

        return  new FilterObject()
            { FilterBy = filterBy, FilterConditions = listConditions, FilterValue = value };
    }
}