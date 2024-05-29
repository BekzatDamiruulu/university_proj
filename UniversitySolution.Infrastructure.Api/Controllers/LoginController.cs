using System.Text;
using Microsoft.AspNetCore.Authorization;
using UniversitySolution.BusinessLogic.Models;
namespace UniversitySolution.Api.Controllers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/v1/[controller]")]
public class LoginController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _configuration;

    public LoginController(UserManager<IdentityUser> userManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<ActionResult> Login(LoginModel loginModel)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(loginModel.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginModel.Password))
                throw new Exception("Invalid login attempt.");
            else
            {
                var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(_configuration["JWT:SigningKey"]!)),
                    SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>();
                claims.Add(new Claim(
                    ClaimTypes.Name, user.UserName!));

                var jwtObject = new JwtSecurityToken(issuer: _configuration["JWT:Issuer"],
                    audience: _configuration["JWT:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: signingCredentials);
                var jwtString = new JwtSecurityTokenHandler().WriteToken(jwtObject);

                return StatusCode(StatusCodes.Status200OK, jwtString);
            }
        }
        catch (Exception e)
        {
            return BadRequest(new {e.Message});
        }
    }
}


