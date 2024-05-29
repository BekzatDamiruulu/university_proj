using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using Exception = System.Exception;

namespace UniversitySolution.BusinessLogic.Services;

public class TeacherService: CommonService<Teacher>
{
    private readonly ICommonRepository<Teacher> _commonRepository;
    public TeacherService(ICommonRepository<Teacher> commonRepository) : base(commonRepository)
    {
        _commonRepository = commonRepository;
    }

    public override Teacher Create(Teacher entity)
    {
        if (entity.GroupId == null)
        {
            return base.Create(entity);
        }

        var teacherRes = _commonRepository.ReadAll(new List<FilterObject>(){new FilterObject(){FilterBy = "GroupId",FilterConditions = new List<string>(){"exact"}, FilterValue = entity.GroupId}});
        if (teacherRes?.Result?.FirstOrDefault()?.GroupId != null)
        {
            throw new Exception("выберите другую группу !");
        }
        return base.Create(entity);
    }

    public override Teacher Update(long id, string jsonForUpdate = "[{\"fieldName\": \"\", \"fieldValue\": \"\"}]")
    {
        var entity = _commonRepository.GetById(id);
        if (entity == null)
        {
            throw new Exception("not found to update entity !");
        }
        return _commonRepository.Update(entity,jsonForUpdate);
    }
}