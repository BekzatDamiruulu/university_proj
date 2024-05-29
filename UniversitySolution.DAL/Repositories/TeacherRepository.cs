
using Microsoft.EntityFrameworkCore;
using UniversitySolution.BusinessLogic.ActionResultEntities;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using UniversitySolution.DAL.CommonRepos;
using UniversitySolution.DAL.Extensions;
using UniversitySolution.DAL.Utils;

namespace UniversitySolution.DAL.Repositories;

public class TeacherRepository : CommonRepository<Teacher>
{
    private readonly DataContext _dataContext;
    public TeacherRepository(DataContext dataContext):base(dataContext)
    {
        _dataContext = dataContext;
    }

    public override ResultData<Teacher>? ReadAll(List<FilterObject>? filterObjects=null,int limit = 20, int offset = 0, string orderType = "ASC", string orderBy = "Id")
    {
        var entitiesSet = _dataContext.Set<Teacher>();
        var query = entitiesSet.AsNoTracking();
        if (filterObjects != null)
        { 
            query =  query.Filter(filterObjects);
        }
        var entities = query!.Include(t=>t.Group).OrderBySqlQuery(orderBy,orderType)
            .Paginate(offset,limit).ToList();
        foreach (var teacher in entities.Where(teacher => teacher.Group != null))
        {
            if (teacher.Group != null)
            {
                teacher.Group.Teacher = null;
            }
        }
        return new ResultData<Teacher>
        {
            Limit = limit,Offset = offset,
            Total = entitiesSet.Count(),
            Count = entities.Count,
            Result = entities
        };
    }

    public override Teacher Update(Teacher teacher, string jsonArrayWithFieldsValue)
    {
        if (teacher.GroupId != null)
        {
            var teachers =_dataContext.Set<Teacher>().AsNoTracking().Where(s=>s.GroupId == teacher.GroupId).ToList();
            if (teachers.FirstOrDefault() != null && teachers.FirstOrDefault()?.Id != teacher.Id)
            {
                throw new Exception("choose another group 1");
            }
        }
        var entity = base.Update(teacher, jsonArrayWithFieldsValue);
        if (entity.GroupId == null) return teacher;
        var group = _dataContext.Set<Group>().AsNoTracking().SingleOrDefault(g=>g.Id == entity.GroupId);
        entity.Group = group;
        group!.Students = null;
        group.Teacher = null;
        return entity;
    }
}