
using Microsoft.AspNetCore.Mvc;
using UniversitySolution.Api.DTOs;
using UniversitySolution.Api.Utils;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.DAL.Ado.Repositories;

namespace UniversitySolution.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class StudentsController: BaseController<Student,StudentDto>
{
    private readonly ICommonService<Student> _commonService;
    private readonly ICommonService<Group> _groupService;
    
    public StudentsController(ICommonService<Student> commonService,ICommonService<Group> groupService,AdoBaseRepository<Student> adoBaseRepository):base(commonService,adoBaseRepository)
    {
        _commonService = commonService;
        _groupService = groupService;
    }
    public override IActionResult Create(StudentDto dtoEntity)
    {
        try
        {
            dtoEntity.Id = default;
            var groupResultData = _groupService.GetById(dtoEntity.GroupId);
            if (groupResultData == null)
            {
                throw new Exception($"{groupResultData.Name} is not found !");
            }
            var createStudent = DtoMapper.ToEntity<Student, StudentDto>(dtoEntity);

            _commonService.Create(createStudent);
            return Ok(DtoMapper.ToEntityDto<Student, StudentDto>(createStudent));
        }
        catch (Exception e)
        {
            return BadRequest(new { Message = e.Message });
        }
    }
}


