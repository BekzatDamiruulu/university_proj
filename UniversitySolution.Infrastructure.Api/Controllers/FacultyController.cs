using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UniversitySolution.Api.DTOs;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.DAL.Ado.Repositories;

namespace UniversitySolution.Api.Controllers;

public class FacultyController : BaseController<Faculty,FacultyDto>
{
    private readonly ICommonService<Faculty> _commonService;
    public FacultyController(ICommonService<Faculty> commonService,AdoBaseRepository<Faculty> adoBaseRepository) : base(commonService,adoBaseRepository)
    {
        _commonService = commonService;
    }

    public override IActionResult Create(FacultyDto dtoEntity)
    {
        var facultyResultData = _commonService.ReadAll(new List<FilterObject>(){new FilterObject(){FilterBy = nameof(dtoEntity.Name) , FilterValue = dtoEntity.Name,FilterConditions = new List<string>(){"EXACT"}}},limit:2)!;
        return facultyResultData.Result?.FirstOrDefault() == null ? base.Create(dtoEntity) : BadRequest(new {Message = $"Already exists {dtoEntity.Name}"});
    }
}