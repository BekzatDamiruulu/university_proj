using Microsoft.EntityFrameworkCore;
using UniversitySolution.BusinessLogic.ActionResultEntities;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using UniversitySolution.DAL.Extensions;
using UniversitySolution.DAL.Utils;

namespace UniversitySolution.DAL.CommonRepos;

public abstract class CommonRepository<TEntity>: ICommonRepository<TEntity> where TEntity :  BaseEntity, new()
{
    private readonly DataContext _dataContext;
    protected CommonRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }
    private DbSet<TEntity> Entities => _dataContext.Set<TEntity>();
    

    public virtual TEntity? GetById(long id)
    {
        var entity =  Entities.SingleOrDefault(t=>t.Id == id);
        _dataContext.ChangeTracker.Clear();
        return entity;
    }
    
    public virtual ResultData<TEntity>? ReadAll(List<FilterObject> filterObjects=null,int limit = 20, int offset = 0, string orderType = "ASC", string orderBy = "Id")
    {
        var query = Entities.AsNoTracking();
        if (filterObjects != null)
        { 
           query =  query.Filter(filterObjects);
        }
        var entities = query.OrderBySqlQuery(orderBy,orderType)
            .Paginate(offset,limit).ToList();
        return new ResultData<TEntity>()
        {
            Limit = limit,Offset = offset,
            Total = Entities.Count(),
            Count = entities.Count,
            Result = entities
        };
    }
    public virtual void Delete(long id)
    {
        var group =Entities.Find(id);
        if (group == null)
            throw new Exception($"not found {nameof(TEntity)} with id "+id);
        Entities.Remove(group);
        _dataContext.SaveChanges();
    }

    public virtual TEntity Create(TEntity entity)
    {
        _dataContext.Add(entity); // ef core сама определить тип нашего сущности
        _dataContext.SaveChanges();
        return entity;
    }
    
    public virtual  TEntity Update(TEntity entity,string jsonArrayWithFieldsValue)
    {
        JsonUpdate.UpdateEntity(_dataContext,entity,jsonArrayWithFieldsValue);
        _dataContext.SaveChanges();
        return entity;
    }
}