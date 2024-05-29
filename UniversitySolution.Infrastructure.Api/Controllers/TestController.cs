using Microsoft.AspNetCore.Mvc;

namespace UniversitySolution.Api.Controllers;
[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("SERVER WORKS");
    }
}