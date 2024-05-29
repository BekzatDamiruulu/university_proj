using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UniversitySolution.Api.DTOs;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.DAL.Ado.Repositories;

namespace UniversitySolution.Api.Controllers;

// [ApiController]
// [Route("api/v1/[controller]")]
public class GroupController: BaseController<Group,GroupDto>
{
    private readonly ICommonService<Group> _commonService;
    public GroupController(ICommonService<Group> commonService,AdoBaseRepository<Group> adoBaseRepository):base(commonService,adoBaseRepository)
    {
        _commonService = commonService;
    }

    public override IActionResult Create(GroupDto dtoEntity)
    {
        var groupResultData = _commonService.ReadAll(new List<FilterObject>(){new FilterObject(){FilterBy = nameof(dtoEntity.Name),FilterConditions = new List<string>(){"EXACT"}}},limit:2)!;
        return groupResultData.Result?.FirstOrDefault() == null ? base.Create(dtoEntity) : BadRequest(new {Message=$"Already exists {dtoEntity.Name} "});
    }
}