using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.enums;

namespace UniversitySolution.DAL.Extensions;

public static class ExtensionClassForIQueryable
{
    public static IQueryable<TEntity>? Filter<TEntity>(this IQueryable<TEntity> source, List<FilterObject> filters)
        where TEntity : class
    {
        IQueryable<TEntity> queryable = source;
        foreach (var filter in filters)
        {
            queryable = queryable.Where(GetFilterFunc(filter));
        }

        return queryable;
        Expression<Func<TEntity, bool>> GetFilterFunc(FilterObject? filterObject)
        {
            var typeEntity = typeof(TEntity);
            if (filterObject == null) throw new ArgumentNullException(nameof(filterObject));
            
            var filterByPropName = filterObject.FilterBy;
            var conditionType = filterObject.FilterConditions[0].ToUpper();

            var parameter = Expression.Parameter(typeEntity, "entity");
            var propertyOfEntity = typeEntity.GetProperty(filterByPropName,
                BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance | BindingFlags.Default);

            if (propertyOfEntity == null)
            {
                throw new Exception($"Property with name {filterByPropName} not found  in entity {typeEntity.Name} !");
            }

            var expressionProperty = Expression.Property(parameter, propertyOfEntity) ??
                                     throw new Exception("Expression.Property(parameter, propertyOfEntity)");
            if (conditionType == "LIKE")
            {
                return Like(filterObject.FilterValue);
                
                Expression<Func<TEntity, bool>> Like(object? value)
                {
                    if (propertyOfEntity.PropertyType.Name.Contains("Int"))
                    {
                        throw new Exception($"cannot use LIKE function for type number !");
                    }
                    var likeExpression = ExpressionCall(value);
                    return Expression.Lambda<Func<TEntity, bool>>(likeExpression, parameter);
                }
            }
            MethodCallExpression ExpressionCall( object? value)
            {
                if (value == null)
                {
                    var isNullOrEmptyMethod = typeof(string).GetMethod(nameof(string.IsNullOrEmpty), new[] { typeof(string) });
                    if (isNullOrEmptyMethod == null)
                    {
                        throw new Exception("isnullorempty method was not created !");
                    }
                    return Expression.Call(
                        isNullOrEmptyMethod,
                        expressionProperty
                        // Expression.Constant(null, propertyOfEntity.PropertyType)
                    );
                }
                var likeMethod = typeof(DbFunctionsExtensions).GetMethod(nameof(DbFunctionsExtensions.Like),
                    new[] { typeof(DbFunctions), typeof(string), typeof(string) });
                return Expression.Call(
                    null,
                    likeMethod!,
                    Expression.Constant(EF.Functions), // DbFunctions
                    expressionProperty, // x.Title
                    Expression.Constant($"%{value}%") // "_n%"
                );
            }

            var body = FilterComparing(conditionType, filterObject.FilterValue);

            return body == null
                ? Expression.Lambda<Func<TEntity, bool>>(Expression.Constant(true), parameter)
                : Expression.Lambda<Func<TEntity, bool>>(body, parameter);

            BinaryExpression? FilterComparing(string filterType, object? comparesionValue)
            {
                var propertyType = propertyOfEntity.PropertyType;
                if (propertyType == null)
                {
                    throw new Exception("property type is null !!!");
                }
                if (propertyType.Name == "Days")
                {
                    if (comparesionValue == null) throw new NullReferenceException("day cannot be null !");
                    var isValid = Enum.TryParse(typeof(Days), comparesionValue.ToString(), true, out var res);
                    if (!isValid || res == null)
                    {
                        throw new Exception($"{comparesionValue} is not valid day !");
                    }
                    var dayNumber = Enum.GetValues(typeof(Days)).ToDynamicArray().ToList().IndexOf(res);
                    comparesionValue = (Days)dayNumber;
                }
                else
                {
                    if (Nullable.GetUnderlyingType(propertyType) != null && comparesionValue != null)
                    {
                        propertyType = Nullable.GetUnderlyingType(propertyType);
                    }
                    else if(comparesionValue != null)
                    {
                        comparesionValue = Convert.ChangeType(comparesionValue, propertyType);
                    }
                }

                switch (filterType)
                {
                    case "EXACT":
                        if (propertyType.Name.Contains("Date"))
                        {
                            return Expression.Equal(Expression.Property(parameter, propertyOfEntity), Expression.Call(
                                    typeof(DateOnly),
                                    "ParseExact", null, Expression.Constant(comparesionValue.ToString()),
                                    Expression.Constant("yyyy-MM-dd")
                                )
                            );
                        }

                        if (propertyType.Name == "Days")
                        {
                            return Expression.Equal(
                                expressionProperty,
                                Expression.Constant(comparesionValue, propertyOfEntity.PropertyType)
                            );
                        }
                        
                        return Expression.Equal(
                            expressionProperty,
                            Expression.Constant(comparesionValue, propertyOfEntity.PropertyType)
                        );
                    case "LESS":
                        if (propertyType.Name.Contains("Date"))
                        {
                            return Expression.LessThan(Expression.Property(parameter, propertyOfEntity), Expression.Call(
                                    typeof(DateOnly),
                                    "ParseExact", null, Expression.Constant(comparesionValue.ToString()),
                                    Expression.Constant("yyyy-MM-dd")
                                )
                            );
                        }
                        else if (propertyType.Name.Contains("String") ||propertyType.Name.Contains("Days") )
                        {
                            throw new Exception("you cannot use less or more condition for string type use EXACT or LIKE !");
                        }

                        return Expression.LessThan(
                            expressionProperty,
                            Expression.Constant(comparesionValue, propertyOfEntity.PropertyType)
                        );
                    case "MORE":
                        if (propertyType.Name.Contains("Date"))
                        {
                            return Expression.GreaterThan(Expression.Property(parameter, propertyOfEntity), Expression.Call(
                                    typeof(DateOnly),
                                    "ParseExact", null, Expression.Constant(comparesionValue.ToString()),
                                    Expression.Constant("yyyy-MM-dd")
                                )
                            );
                        } if (propertyType.Name.Contains("String") || propertyType.Name.Contains("Days"))
                        {
                            throw new Exception("you cannot use less or more condition for string type use EXACT or LIKE !");
                        }

                        return Expression.GreaterThan(
                            expressionProperty,
                            Expression.Constant(comparesionValue, propertyOfEntity.PropertyType)
                        );
                    default:
                        return null;
                }
            }
        }
    }
}

