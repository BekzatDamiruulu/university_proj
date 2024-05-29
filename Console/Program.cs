// using System.Linq.Expressions;
// using System.Reflection;
// using UniversitySolution.BusinessLogic.Entities;
// var parameter = Expression.Parameter(typeof(Subject), "entity");
// var property = typeof(Subject).GetProperty("Day", BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
// var expressionProperty = Expression.Property(parameter, property);
// var constantValue = Expression.Constant(Days.Среда, typeof(Days));
// var equalityExpression = Expression.Equal(expressionProperty, constantValue);
// var lambda = Expression.Lambda<Func<Subject, bool>>(equalityExpression, parameter);

System.Console.WriteLine("hello world".Replace("world","hello"));

