using Microsoft.AspNetCore.Mvc;
using UniversitySolution.Api.DTOs;
using UniversitySolution.Api.Utils;
using UniversitySolution.BusinessLogic.ActionResultEntities;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using UniversitySolution.DAL.Ado.Repositories;

namespace UniversitySolution.Api.Controllers;

public class SubjectsController : BaseController<Subject,SubjectDto>
{
    private readonly ICommonService<Subject> _commonService;
    public SubjectsController(ICommonService<Subject> commonService,AdoBaseRepository<Subject> adoBaseRepository) : base(commonService,adoBaseRepository)
    {
        _commonService = commonService;
    }

    public override IActionResult Create(SubjectDto dtoEntity)
    {
        try
        {
            var subjectDto = SubjectMapper.ToSubjectDto(_commonService.Create(SubjectMapper.ToSubject(dtoEntity)));
            return Ok( _commonService.Create(SubjectMapper.ToSubject(subjectDto)));
        }
        catch (Exception e)
        {
            return BadRequest(new {e.Message});
        }
    }

    public override IActionResult ReadAll(string? filter = null, int limit = 10, int offset = 0, string orderType = "ASC",
        string orderBy = "Id")
    {
        try
        {
            List<FilterObject>? filterObject = null;
            if (filter != null)
            {
                filterObject = JsonDeserializer.ToFilterObjectsList(filter);
            }
            var resultData = _commonService.ReadAll(filterObject,limit,offset,orderType,orderBy)!;
            if (resultData.Result==null)
            {
                return Ok(new ResultData<SubjectDto>
                    { Limit = limit, Offset = offset, Count = 0, Total = 0, Result = null });
            }
            var listItemsDto = resultData.Result.Select(SubjectMapper.ToSubjectDto).ToList();
            return Ok(new ResultData<SubjectDto>{Limit = limit,Offset = offset,Count = resultData!.Count,Total = resultData.Total,Result = listItemsDto});
        }
        catch (Exception e)
        {
            return BadRequest(new { Message = e.Message });
        }
    }

    public override IActionResult GetById(long id)
    {
        try
        {
            var entity = _commonService.GetById(id);
            return Ok( SubjectMapper.ToSubjectDto(entity));
        }
        catch (Exception e)
        {
            NotFound();
            return BadRequest(new { Message = e.Message });
        }
    }

    public override IActionResult Update(long id, string json = "[{\"fieldName\": \"Name\", \"fieldValue\": \"New Name\"}]")
    {
        return Ok(SubjectMapper.ToSubjectDto(_commonService.Update(id,json)));
    }
}


