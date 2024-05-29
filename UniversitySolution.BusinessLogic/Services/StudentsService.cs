using Microsoft.EntityFrameworkCore;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;

namespace UniversitySolution.BusinessLogic.Services;

public class StudentsService: CommonService<Student>
{
    private readonly ICommonRepository<Student> _commonRepository;
    private readonly ICommonRepository<Group> _groupRepo;
    public StudentsService(ICommonRepository<Student> commonRepository,ICommonRepository<Group> gRepository) : base(commonRepository)
    {
        _commonRepository = commonRepository;
        _groupRepo = gRepository;
    }

    public override Student Create(Student entity)
    {
        var student = _commonRepository.ReadAll(new List<FilterObject>(){new (){FilterBy = nameof(entity.FullName),FilterConditions = new List<string>(){"exact"},FilterValue = entity.FullName}},limit:2);
        if (student != null && entity.Email== student.Result.FirstOrDefault()?.Email)
        {
            throw new Exception(entity.FullName + " already exists !");
        }
        return base.Create(entity);
    }
    public override Student Update(long id,string jsonArrayWithFieldsValue = @"[{""fieldName"": """", ""fieldValue"": """"}]")
    {
        var entity = _commonRepository.GetById(id);
        if (entity == null)
        {
            throw new Exception("not found to update entity !");
        }
        entity.Group = _groupRepo.GetById(entity.GroupId);       
        entity.Group!.Students = null;
        return _commonRepository.Update(entity, jsonArrayWithFieldsValue);
    }
}