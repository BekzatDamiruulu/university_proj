using Microsoft.EntityFrameworkCore;
using UniversitySolution.BusinessLogic.ActionResultEntities;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using UniversitySolution.DAL.CommonRepos;
using UniversitySolution.DAL.Extensions;

namespace UniversitySolution.DAL.Repositories;

public class FacultyRepository : CommonRepository<Faculty>
{
    private readonly DataContext _db;
    public FacultyRepository(DataContext dataContext) : base(dataContext)
    {
        _db = dataContext;
    }

    public override ResultData<Faculty>? ReadAll(List<FilterObject> filterObjects = null, int limit = 20, int offset = 0, string orderType = "ASC",
        string orderBy = "Id")
    {
        var facultySet = _db.Set<Faculty>();
        var groupsQuery = _db.Set<Group>()
            .GroupBy(g => g.FacultyId)
            .Select(g => new { FacultyId = g.Key, Count = g.Count() });
        
        var facultyQuery = from f in facultySet.AsNoTracking()
            join g in groupsQuery
                on f.Id equals g.FacultyId into joined
            from j in joined.DefaultIfEmpty() 
            select new Faculty(){Id = f.Id,Name = f.Name,CountGroups = (int?)j.Count ?? 0} ;
        
        if (filterObjects != null)
        {
             facultyQuery=facultyQuery.Filter(filterObjects);
        }

        var facultyEntities = facultyQuery?.OrderBySqlQuery(orderBy, orderType)
            .Paginate(offset, limit).ToList();
        return new ResultData<Faculty>{
            Limit = limit,
            Offset = offset,
            Result = facultyEntities,
            Count = facultyEntities?.Count ?? 0,
            Total = facultySet.Count()
        };
    }
}






