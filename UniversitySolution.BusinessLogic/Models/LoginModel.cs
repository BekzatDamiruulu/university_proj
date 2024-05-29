using System.ComponentModel.DataAnnotations;

namespace UniversitySolution.BusinessLogic.Models;

public class LoginModel
{
    [Required] [MaxLength(255)] public string UserName { get; set; } = null!;
    [Required] public string Password { get; set; } = null!;
}