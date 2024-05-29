namespace UniversitySolution.BusinessLogic.Common;

public class FilterObject
{
    public string FilterBy { get; set; }
    public object? FilterValue { get; set; }
    public List<string> FilterConditions { get; set; } = new List<string>{ "LIKE","EXACT","LESS","MORE"};
}
