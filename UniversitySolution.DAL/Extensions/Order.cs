using System.Linq.Expressions;
using System.Reflection;
using System.Linq.Dynamic.Core;
namespace UniversitySolution.BusinessLogic.Utils;

public static class OrderByAny
{
    public static IQueryable<TEntity> OrderBySqlQuery<TEntity>(this IQueryable<TEntity> entities,string orderField="Id",string orderType="ASC")where TEntity : class
    {
        var orderByExpression = $"{orderField} {orderType}";
        return entities.OrderBy(orderByExpression);
    }
}