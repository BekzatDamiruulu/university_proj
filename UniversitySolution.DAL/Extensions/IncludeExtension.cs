using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using UniversitySolution.BusinessLogic.Entities;

namespace UniversitySolution.DAL.Extensions;

public static class IncludeExtension
{
    public static IQueryable<T> IncludeMultiple<T>(this IQueryable<T> query,
        params Expression<Func<T, object>>[]? includes)
        where T : BaseEntity
    {
        if (includes != null)
        {
            query = includes.Aggregate(query,
                (current, include) => current.Include(include));
        }
        return query;
    }
}