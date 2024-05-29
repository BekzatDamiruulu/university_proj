using Console;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using UniversitySolution.BusinessLogic;
using UniversitySolution.DAL;
using UniversitySolution.DAL.ServiceCollections;
[assembly: ApiController]

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(s =>
    s.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Name = "Bearer",
            },
            new List<string>()
        }
    })
);

builder.Services.AddServicesEf();

builder.Services.AddCoreServices();

builder.Services.AddCors();


builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>  {
        options.Password.RequireDigit = true; 
        options.Password.RequireLowercase = true; 
        options.Password.RequireUppercase = true; 
        options.Password.RequireNonAlphanumeric = true; 
        options.Password.RequiredLength = 12;  })
    .AddEntityFrameworkStores<DataContext>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        options.DefaultChallengeScheme =
            options.DefaultForbidScheme =
                options.DefaultScheme =
                    options.DefaultSignInScheme =
                        options.DefaultSignOutScheme =
                            JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"]!))
    };
});

var environmentVariable = Environment.GetEnvironmentVariable("DOTNET_VERSION_COPY");
System.Console.WriteLine("DOTNET_VERSION_COPY: "+environmentVariable);
System.Console.WriteLine("FRONT_PORT: "+Environment.GetEnvironmentVariable("FRONT_PORT"));
var connection = builder.Configuration.GetConnectionString("ProductionConnection"); ;
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<DataContext>(
        options => { options.UseNpgsql(builder.Configuration.GetConnectionString("DevelopmentConnection")); }
    );
}

else
{
    System.Console.WriteLine(builder.Configuration.GetSection("Logging").Value);
    System.Console.WriteLine("connection : "+connection);
    if (connection == null)
    {
        throw new Exception("connection string is not gotted");
    }

    System.Console.WriteLine("env values: "+$"host: {Environment.GetEnvironmentVariable("POSTGRES_HOST")} port: {Environment.GetEnvironmentVariable("POSTGRES_PORT")} db:  {
        Environment.GetEnvironmentVariable("POSTGRES_DB")
    }   user:{Environment.GetEnvironmentVariable("POSTGRES_USER")}   pass:{Environment.GetEnvironmentVariable("POSTGRES_PASSWORD")} ");
    
    connection =connection!.Replace("POSTGRES_HOST", Environment.GetEnvironmentVariable("POSTGRES_HOST"));
    connection =connection!.Replace("POSTGRES_PORT", Environment.GetEnvironmentVariable("POSTGRES_PORT"));
    connection =connection!.Replace("POSTGRES_DB", Environment.GetEnvironmentVariable("POSTGRES_DB"));
    connection =connection!.Replace("POSTGRES_USER", Environment.GetEnvironmentVariable("POSTGRES_USER"));
    connection =connection!.Replace("POSTGRES_PASSWORD", Environment.GetEnvironmentVariable("POSTGRES_PASSWORD"));
    System.Console.WriteLine("connections AFTER CHANGING "+connection);
    builder.Services.AddDbContext<DataContext>(
        options => { options.UseNpgsql(connection); }
    );
}

var app = builder.Build();
using var scope = app.Services.CreateScope();
var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();

var pendingMigrations = dataContext.Database.GetPendingMigrations();
if (pendingMigrations.Any())
{
    dataContext.Database.Migrate();
}

var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
var p = new ProfileInitializer(dataContext,userManager);
p.Initialize();
dataContext.Dispose();

if (app.Environment.IsDevelopment())
{
    app.UseCors(opt=>opt.AllowAnyOrigin().AllowAnyHeader()
        .AllowAnyMethod());
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();  ///////---------

app.UseAuthorization();   ///////---------

app.MapControllers( );

app.Run();
