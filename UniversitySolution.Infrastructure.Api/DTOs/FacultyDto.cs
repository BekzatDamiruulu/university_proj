namespace UniversitySolution.Api.DTOs;

public class FacultyDto
{
    public long
        Id { get; set; }
    public string Name { get; set; } = null!;
    public int CountGroups { get; set; }
    public List<GroupDto>? Groups { get; set; }
}