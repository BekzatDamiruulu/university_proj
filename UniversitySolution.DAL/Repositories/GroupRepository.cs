using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using UniversitySolution.BusinessLogic.ActionResultEntities;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using UniversitySolution.DAL.CommonRepos;
using UniversitySolution.DAL.Extensions;

namespace UniversitySolution.DAL.Repositories;

public class GroupRepository: CommonRepository<Group>
{
    private readonly DataContext _dataContext;
    public GroupRepository(DataContext dataContext):base(dataContext)
    {
        _dataContext = dataContext;
    }

    public override Group Create(Group group)
    {
        ParameterExpression parameter = Expression.Parameter(typeof(Group), "ent");
        var equalExpression = Expression.Equal(
            Expression.Property(parameter, "Name"),
            Expression.Constant(group.Name, typeof(string))
        );
        //(entity => entity.Name == "anotherName")
        Expression<Func<Group, bool>> lambdaExpression =
            Expression.Lambda<Func<Group, bool>>(equalExpression, parameter);

        var resEntity = _dataContext.Set<Group>().FirstOrDefault(lambdaExpression);
        if (resEntity != null)
        {
            throw new Exception("already existing " + nameof(group));
        }
        _dataContext.Entry(group).State = EntityState.Detached;
        _dataContext.Set<Group>().Add(group);
        _dataContext.SaveChanges();
        return group;

    }

    public override ResultData<Group> ReadAll(List<FilterObject>? filterObjects = null, int limit = 20, int offset = 0, string orderType = "ASC",
        string orderBy = "Id")
    {
        Console.WriteLine($" start {DateTime.Now.Second}  {DateTime.Now.Millisecond}");
        var groupSet = _dataContext.Set<Group>();
        var studentsQuery = _dataContext.Set<Student>()
            .AsNoTracking()
            .GroupBy(s => s.GroupId)
            .Select(s => new { GroupedBy = s.Key, CountStudents = (int?)s.Count() });
        
        var subjectsQuery = _dataContext.Set<Subject>()
            .AsNoTracking()
            .GroupBy(s => s.GroupId)
            .Select(s => new { GroupedBy = s.Key, CountSubjects = (int?)s.Count() });

        var groupsQuery = from g in groupSet.AsSplitQuery().AsNoTracking()
                join stud in studentsQuery
                    on g.Id equals stud.GroupedBy into joined
                from r in joined.DefaultIfEmpty()
                select  new Group
                {   Id = g.Id,
                    CountStudents = r.CountStudents ?? 0,
                    Created = g.Created,
                    FacultyId = g.FacultyId,
                    MaxNumberOfStudents = g.MaxNumberOfStudents,
                    Name = g.Name,
                    Faculty = g.Faculty,
                    Teacher = g.Teacher
                };
        var query = from g in groupsQuery
            join subj in subjectsQuery
                on g.Id equals subj.GroupedBy into joined
            from j in joined.DefaultIfEmpty()
            select new Group{
                Id = g.Id,
                CountStudents = g.CountStudents,
                Created = g.Created,
                FacultyId = g.FacultyId,
                Faculty = g.Faculty,
                Teacher = g.Teacher,
                MaxNumberOfStudents = g.MaxNumberOfStudents,
                Name = g.Name,
                CountSubjects = j.CountSubjects ?? 0
            };
        if (filterObjects != null)
        { 
            query=query.Filter(filterObjects);
        }
        var groupEntities = query!.OrderBySqlQuery(orderBy,orderType)
            .Paginate(offset,limit).ToList();
        Console.WriteLine($" end {DateTime.Now.Second}  {DateTime.Now.Millisecond}");
        return new ResultData<Group>(){
            Limit = limit,
            Offset = offset,
            Result = groupEntities,
            Count = groupEntities.Count,
            Total = groupSet.Count()
        };
    }
    public override Group Update(Group entity, string jsonArrayWithFieldsValue)
    {
       var group = base.Update(entity, jsonArrayWithFieldsValue);
        group = _dataContext.Set<Group>().Where(g => g.Id == group.Id)
           .IncludeMultiple(g=>g.Faculty,g=>g.Teacher).ToList().FirstOrDefault();
        if (group.Faculty != null)
        {
            group.Faculty.Groups = null;
        }  if (group.Teacher != null)
        {
            group.Teacher.Group = null;
        }
        return group;
    }
}

