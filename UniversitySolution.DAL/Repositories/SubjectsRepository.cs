using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using UniversitySolution.BusinessLogic.ActionResultEntities;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using UniversitySolution.DAL.CommonRepos;
using UniversitySolution.DAL.Extensions;

namespace UniversitySolution.DAL.Repositories;
public class SubjectsRepository :  CommonRepository<Subject>
{
    private readonly DataContext _dataContext;
    public SubjectsRepository(DataContext dataContext) : base(dataContext)
    {
        _dataContext = dataContext;
    }
    public override ResultData<Subject>? ReadAll(List<FilterObject>? filterObjects=null,int limit = 20, int offset = 0, string orderType = "ASC", string orderBy = "Id")
    {
        var entitiesSet = _dataContext.Set<Subject>();
        var query = entitiesSet.AsNoTracking();
        if (filterObjects != null)
        { 
            query =  query.Filter(filterObjects);
        }
        var entities = query.Include(s=>s.Teacher).OrderBySqlQuery(orderBy,orderType)
            .Paginate(offset,limit).ToList();
        foreach (var s in entities)
        {
            s.Teacher.Subjects = null;
        }
        return new ResultData<Subject>()
        {
            Limit = limit,Offset = offset,
            Total = entitiesSet.Count(),
            Count = entities.Count,
            Result = entities
        };
    }

    public override Subject Create(Subject entity)
    {
        var res = base.Create(entity);
        res.Teacher =  _dataContext.Set<Teacher>().Where(t => t.Id == res.TeacherId).ToList()?.FirstOrDefault();

        if (res.Teacher != null)
        {
            res.Teacher.Subjects = null;
        }
        return res;
    }

    public override Subject Update(Subject entity, string jsonArrayWithFieldsValue)
    {
        var res = base.Update(entity,jsonArrayWithFieldsValue);
        res.Teacher = _dataContext.Set<Teacher>().FirstOrDefault(t => t.Id == res.TeacherId)!;
        return res;
    }
}