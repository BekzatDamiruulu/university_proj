using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.enums;

namespace UniversitySolution.Api.Controllers;
// [Authorize]
[ApiController]
[Route("[controller]")]
public class DaysController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDays()
    {
        return Ok(Enum.GetNames(typeof(Days)));
    }
}