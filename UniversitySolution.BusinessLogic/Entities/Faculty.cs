using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniversitySolution.BusinessLogic.Entities;

public class Faculty:BaseEntity
{
    public string Name { get; set; } = null!;
    [NotMapped] public int CountGroups { get; set; }
    public List<Group>? Groups { get; set; } = null;
}