using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace UniversitySolution.BusinessLogic.Entities;

public class Student : BaseEntity
{
    public int Age { get; set; }
    public string FullName { get; set; } = null!;
    [Required]
    public long GroupId { get; set; } 
    public Group? Group { get; set; }
    public string PhoneNumber { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Photo { get; set; }

}







