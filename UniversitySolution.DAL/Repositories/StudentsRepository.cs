using Microsoft.EntityFrameworkCore;
using UniversitySolution.BusinessLogic.ActionResultEntities;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using UniversitySolution.DAL.CommonRepos;
using UniversitySolution.DAL.Extensions;

namespace UniversitySolution.DAL.Repositories;

public class StudentsRepository : CommonRepository<Student>
{
    private readonly DataContext _dataContext;
    public StudentsRepository(DataContext dataContext):base(dataContext)
    {
        _dataContext = dataContext;
    }
   public override ResultData<Student>? ReadAll(List<FilterObject>? filterObjects=null,int limit = 20, int offset = 0, string orderType = "ASC", string orderBy = "Id")
   {
       var students = _dataContext.Set<Student>();
        var query = students.AsNoTracking();
        if (filterObjects != null)
        { 
            query =  query.Filter(filterObjects);
        }
        var entities = query!.Include(s=>s.Group).OrderBySqlQuery(orderBy,orderType)
            .Paginate(offset,limit).ToList();
        foreach (var student in entities.Where(student => student.Group != null))
        {
            if (student.Group != null)
            {
                student.Group.Students = null;
            }
        }
        return new ResultData<Student>
        {
            Limit = limit,Offset = offset,
            Total = students.Count(),
            Count = entities.Count,
            Result = entities
        };
    }

}