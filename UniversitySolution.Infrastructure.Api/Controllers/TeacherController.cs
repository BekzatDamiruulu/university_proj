using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using UniversitySolution.Api.DTOs;
using UniversitySolution.Api.Utils;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using UniversitySolution.DAL.Ado.Repositories;

namespace UniversitySolution.Api.Controllers;

public class TeacherController : BaseController<Teacher,TeacherDto>
{
    public TeacherController(ICommonService<Teacher> commonService,AdoBaseRepository<Teacher> adoBaseRepository):base(commonService,adoBaseRepository)
    {
    }
}