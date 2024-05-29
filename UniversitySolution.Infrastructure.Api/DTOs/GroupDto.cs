using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.DAL;

namespace UniversitySolution.Api.DTOs;

public class GroupDto
{
    public long Id { get; set; }
    public string Name { get; set; } = null!;
    public DateOnly Created { get; set; } = DateOnly.Parse(DateTime.Now.ToString("yyyy-MM-dd"));
    public int MaxNumberOfStudents { get; set; }
    public int CountStudents { get; set; }
    public List<StudentDto>? Students { get; set; }
    public long FacultyId { get; set; }
    public int CountSubjects { get; set; }
    public List<SubjectDto>? Subjects { get; set; }
    public TeacherDto? Teacher { get; set; } 
    public FacultyDto? Faculty { get; set; } 
}
