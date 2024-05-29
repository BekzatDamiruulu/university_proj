
using System.Text.Json.Serialization;

namespace UniversitySolution.Api.DTOs;

public class TeacherDto
{
    public long Id { get; set; }
    public string Name { get; set; } = null!;
    public string Photo { get; set; } = null!;
    public long? GroupId { get; set; }
    public GroupDto? Group { get; set; }
    public string TeachersSubject { get; set; } = null!;
    public DateOnly BirthDate { get; set; } = DateOnly.Parse(DateTime.Now.ToString("yyyy-MM-dd"));
}
