
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniversitySolution.BusinessLogic.Entities;

public class Group:BaseEntity
{
    public string Name { get; set; } = null!;
    public Teacher? Teacher { get; set; }
    public DateOnly Created { get; set; } = DateOnly.Parse(DateTime.Now.ToString("yyyy-MM-dd"));
    public int MaxNumberOfStudents { get; set; }
    [NotMapped]
    public int CountStudents { get; set; }
    public List<Student>? Students { get; set; }
    public long FacultyId { get; set; }
    public Faculty? Faculty { get; set; }
    [NotMapped]
    public int CountSubjects { get; set; }
    public List<Subject> Subjects { get; set; }
}