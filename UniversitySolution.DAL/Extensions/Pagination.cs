namespace UniversitySolution.DAL.Extensions;

public static class Pagination
{
    public static IQueryable<T> Paginate<T>(this IQueryable<T> entities, int offset = 1, int limit=20)
    {
        if (limit == 0)
            throw new ArgumentOutOfRangeException("limit","cannot be zero or negative");
        if (offset < 0)
            throw new ArgumentOutOfRangeException("offset","cannot be  negative");
        return entities.Skip(offset).Take(limit);
    }
}