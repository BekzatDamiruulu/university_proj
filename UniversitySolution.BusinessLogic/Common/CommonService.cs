using System.Reflection;
using UniversitySolution.BusinessLogic.ActionResultEntities;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;

namespace UniversitySolution.BusinessLogic.Common;

public abstract class CommonService<TEntity> : ICommonService<TEntity> where TEntity : BaseEntity,new()
{
    private readonly ICommonRepository<TEntity> _commonRepository;

    protected CommonService(ICommonRepository<TEntity> commonRepository)
    {
        _commonRepository = commonRepository;
    }
    public virtual ResultData<TEntity>? ReadAll(List<FilterObject> filterObjects = null,int limit = 20, int offset = 0, string orderType = "ASC", string orderBy = "Id")
    {
        return _commonRepository.ReadAll(filterObjects,limit, offset, orderType, orderBy);
    }
    public virtual TEntity GetById(long id)
    {
        if (id <= 0)
            throw new ArgumentOutOfRangeException(nameof(id), "argument cannot be negative ");
        var entity = _commonRepository.GetById(id);
        if (entity == null)
            throw new NullReferenceException($"Not found {typeof(TEntity).Name} with id "+id);
        return entity;
    }
    public virtual void Delete(long id)
    { 
        if (id <= 0)
        {
            throw new Exception("Argument cannot be negative "+id);
        }
        _commonRepository.Delete(id);
    }
    public virtual TEntity Create(TEntity entity)
    {
        var type = typeof(TEntity);
        var property = type.GetProperty("id",
            BindingFlags.Default | BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase);
        if (property != null)
        {
            property.SetValue(entity,default);
        }
        return _commonRepository.Create(entity);
    }
    public virtual TEntity Update(long id,string jsonArrayWithFieldsValue = @"[{""fieldName"": """", ""fieldValue"": """"}]")
    {
        var entity = _commonRepository.GetById(id);
        if (entity == null)
        {
            throw new Exception("not found to update entity !");
        }
        return _commonRepository.Update(entity,jsonArrayWithFieldsValue);
    }
}