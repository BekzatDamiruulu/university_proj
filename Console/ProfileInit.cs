using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using UniversitySolution.DAL;

namespace Console;

public class ProfileInitializer
{

    private readonly DataContext _dataContext;
    private readonly UserManager<IdentityUser> _manager;
    public ProfileInitializer(DataContext dataContext,UserManager<IdentityUser> manager)
    {
        _dataContext = dataContext;
        _manager = manager;
        
    }
    public async void Initialize()
    {
        var loginModel = new RegisterModel(){Email = "Bekzat@gmail.com!",Password = "Bekzat2003!!!",UserName = "BekzatDamir"};
        var user =  _dataContext.Users.FirstOrDefault(l => l.UserName==loginModel.UserName);
        if (user != null) return;
        var result = await _manager.CreateAsync(
            new IdentityUser(){UserName = loginModel.UserName,Email = loginModel.Email}, loginModel.Password);
        
        if (result.Succeeded)
        {
            System.Console.WriteLine("success !");
        }
    }
}

public class RegisterModel
{
    [Required]
    public string UserName { get; set; }=null!;
    [Required]
    [EmailAddress]
    public string Email { get; set; }=null!;
    [Required]
    public string Password { get; set; }=null!;
}