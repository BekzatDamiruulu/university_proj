using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Interfaces.IServices;
using UniversitySolution.BusinessLogic.Utils;

namespace UniversitySolution.BusinessLogic.Services;

public class GroupService : CommonService<Group>
{
    private readonly ICommonRepository<Student> _studentRepository;
    private readonly ICommonRepository<Faculty> _facultyRepo;
    private readonly ICommonRepository<Group> _commonRepository;
    
    public GroupService(ICommonRepository<Group> commonRepository,ICommonRepository<Student> studentRepository, ICommonRepository<Faculty> facultyRepo) : base(commonRepository)
    {
        _commonRepository = commonRepository;
        _studentRepository = studentRepository;
        _facultyRepo = facultyRepo;
    }

    public override Group Create(Group entity)
    {
        var faculty = _facultyRepo.GetById(entity.FacultyId);
        if (faculty == null)
        {
            throw new Exception($"faculty with id {entity.FacultyId} not found");
        }
        if (entity.Students == null)
        {
            return base.Create(entity);
        }
        var students = entity.Students;
        entity.Students = null;
        var group= base.Create(entity);
        group.Students = new List<Student>();
        foreach (var student in students)
        {
            student.GroupId = group.Id;
            student.Group = group;
            _studentRepository.Create(student);
        }
        group.Students = students;
        return group;
    }

}