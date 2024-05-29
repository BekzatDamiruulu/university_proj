using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq.Dynamic.Core;
using UniversitySolution.BusinessLogic.enums;

namespace UniversitySolution.BusinessLogic.Entities;
[Table("Subjects")]
public class Subject : BaseEntity
{
    public Days Day {get; set; }
    public int RoomNumber { get; set; }
    public string NameOfSubject { get; set; } = null!;
    public int NumberOfSubject { get; set; }
    public string TypeOfSubject { get; set; } = null!;
    public long GroupId { get; set; }
    public Group Group { get; set; } = null!;
    public long TeacherId { get; set; }
    public Teacher? Teacher { get; set; }= null!;
    [MaxLength(10)]
    public string Starts { get; set; }
    [MaxLength(10)]
    public string Ends { get; set; }
}


