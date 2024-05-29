using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace UniversitySolution.BusinessLogic.Entities;

public class Teacher:BaseEntity
{
    public string Photo { get; set; } = null!;
    public string Name { get; set; } = null!;
    public long? GroupId { get; set; }
    public Group? Group { get; set; }
    public string TeachersSubject { get; set; } = null!;
    public DateOnly BirthDate { get; set; } = DateOnly.Parse(DateTime.Now.ToString("yyyy-MM-dd"));
    [NotMapped]
    public int CountSubjects { get; set; }
    public List<Subject> Subjects { get; set; }
}