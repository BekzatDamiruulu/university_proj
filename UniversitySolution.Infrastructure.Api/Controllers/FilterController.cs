using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UniversitySolution.BusinessLogic.Common;

namespace UniversitySolution.Api.Controllers;
[Route("api/v1/[controller]")]
// [Authorize]
public class FilterController:ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new FilterObject
            {
                FilterBy = "Id",FilterValue = "10",FilterConditions = new List<string>(){"LESS","MORE","EXACT","LIKE"}
            });
    }
}