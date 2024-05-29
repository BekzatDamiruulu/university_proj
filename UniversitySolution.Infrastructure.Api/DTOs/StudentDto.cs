
using System.ComponentModel.DataAnnotations;

namespace UniversitySolution.Api.DTOs;

public class StudentDto
{
    public long Id { get; set; }
    public int Age { get; set; }
    public string FullName { get; set; } = null!;
    [Required]
    public long GroupId { get; set; }
    public GroupDto? Group { get; set; } = null;
    public string PhoneNumber { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Photo { get; set; } = null!;
}