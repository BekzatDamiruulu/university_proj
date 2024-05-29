using UniversitySolution.BusinessLogic.Entities;
using Group = System.Text.RegularExpressions.Group;

namespace UniversitySolution.Api.DTOs;


public class SubjectDto
{
    public long Id { get; set; }
    public string Day { get; set; } = null!; 
    public int RoomNumber { get; set; }
    public string NameOfSubject { get; set; } = null!;
    public int NumberOfSubject { get; set; }
    public string TypeOfSubject { get; set; } = null!;
    public long GroupId { get; set; }
    public long TeacherId { get; set; }
    public TeacherDto? Teacher  { get; set; }
    public string Starts { get; set; }
    public string Ends { get; set; }
}