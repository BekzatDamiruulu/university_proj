using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UniversitySolution.Api.Utils;
using UniversitySolution.BusinessLogic.ActionResultEntities;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using UniversitySolution.DAL.Ado.Repositories;

namespace UniversitySolution.Api.Controllers;
[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public abstract class BaseController<TEntity,TEntityDto>:ControllerBase where TEntity:BaseEntity,new() where TEntityDto:class,new() 
{
    private readonly ICommonService<TEntity> _commonService;
    private readonly AdoBaseRepository<TEntity> _adoBaseRepository;

    protected BaseController(ICommonService<TEntity> commonService, AdoBaseRepository<TEntity> adoBaseRepository)
    {
        _commonService = commonService;
        _adoBaseRepository = adoBaseRepository;
    }
    [HttpGet]
    public virtual IActionResult ReadAll(string? filter=null,int limit = 10, int offset = 0, string orderType = "ASC", string orderBy = "Id")
    {
        try
        {
           List<FilterObject> filterObjects = null;
            if (filter != null)
            {
                filterObjects = JsonDeserializer.ToFilterObjectsList(filter);
            }
            var resultData = _commonService.ReadAll(filterObjects,limit,offset,orderType,orderBy)!;
            if (resultData.Result==null)
            {
                throw new NullReferenceException(typeof(TEntity).Name +" is null !");
            }
            var listItemsDto = resultData?.Result.Select(DtoMapper.ToEntityDto<TEntity,TEntityDto>);
            return Ok(listItemsDto == null 
                ? new ResultData<TEntityDto>{Limit = limit,Offset = offset,Count = 0,Total = 0,Result = null} 
                : new ResultData<TEntityDto>{Limit = limit,Offset = offset,Count = resultData!.Count,Total = resultData.Total,Result = listItemsDto.ToList()});
        }
        catch (Exception e)
        {
            return BadRequest(new { Message = e.Message });
        }
    }
    [HttpPost()]
    public virtual IActionResult Create([FromBody]TEntityDto dtoEntity)
    {
       try
       {
           var entity = DtoMapper.ToEntity<TEntity,TEntityDto>(dtoEntity);
           return Ok(DtoMapper.ToEntityDto<TEntity,TEntityDto>(_commonService.Create(entity)));
       }
       catch (Exception e)
       {
           return BadRequest(new { Message = e.Message });
       }
    }

    [HttpGet("{id:long}")]
    public virtual IActionResult GetById(long id)
    {
        try
        {
            var entity = _commonService.GetById(id);
            return Ok(DtoMapper.ToEntityDto<TEntity,TEntityDto>(entity));
        }
        catch (Exception e)
        {
            NotFound();
            return BadRequest(new { Message = e.Message });
        }
    }

    [HttpDelete()]
    public virtual IActionResult Delete(long id)
    {
        try
        {
            _commonService.Delete(id);
            return Ok(new {Message = "Successfully !"});
        }
        catch (Exception e)
        {
            return Ok(new {Message = e.Message});
        }
    }
    
    [HttpPatch()]
    public virtual IActionResult Update(long id, string json = @"[{""fieldName"": ""Name"", ""fieldValue"": ""New Name""}]")
    {
        try
        {
            var updatedEntity = _commonService.Update(id, json);
            return Ok(DtoMapper.ToEntityDto<TEntity,TEntityDto>(updatedEntity));
        }
        catch (Exception e)
        {
            return BadRequest(new { Message = e.Message });
        }
    }
    [HttpGet("propertiesName")]
    public string[] GetCol()
    {
        return _adoBaseRepository.GetColumnsName();
    }
    
    [HttpPost("dataCertainProp")]
    public async Task<IActionResult> ReadAll(List<string>? propNames=null,string? filter=null
        ,int limit = 10, int offset = 0, string orderType = "ASC"
        , string orderBy = "Id",bool readAll = false
    )
    {
        return Ok(await _adoBaseRepository.ReadAllWithDefColumns(propNames,filter,limit,offset,orderType,orderBy,readAll));
    }
}

