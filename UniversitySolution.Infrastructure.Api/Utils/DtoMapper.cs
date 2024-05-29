using System.Collections;
using System.Reflection;
using UniversitySolution.Api.DTOs;
using UniversitySolution.BusinessLogic.Entities;

namespace UniversitySolution.Api.Utils;

public static class DtoMapper
{
    private static void CopyProperties(object source, object destination)
         {
             foreach (var property in source.GetType().GetProperties())
             {
                 var destinationProperty = destination.GetType().GetProperty(property.Name);
                 destinationProperty?.SetValue(destination, property.GetValue(source));
             }
         }
    public static TEntity ToEntity<TEntity, TEntityDto> (TEntityDto dto)where TEntity : class,new() where TEntityDto : class,new()
    {
        var entity = new TEntity();
        var entityType = entity.GetType();
        var entityDtoType = dto.GetType();
        foreach (var property in entityDtoType.GetProperties())
        {
            if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(List<>))
            {
                var typeEntity = entityType.GetProperty(property.Name)?.PropertyType.GetGenericArguments().FirstOrDefault();
                if (typeEntity == null)
                {
                    throw new Exception();
                }
                if (property.GetValue(dto) is IEnumerable listDto)
                {
                    var entityList = Activator.CreateInstance(typeof(List<>).MakeGenericType(typeEntity));
                    foreach (var listItem in listDto)
                    {
                        var typeEntityObj = Activator.CreateInstance(typeEntity);
                        CopyProperties(listItem, typeEntityObj);
                        entityList.GetType().GetMethod("Add").Invoke(entityList, new[] { typeEntityObj });
                    }
                    entityType.GetProperty(property.Name, BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase)?
                        .SetValue(entity, entityList);
                }
                continue;
            }
            if (property.PropertyType.BaseType == typeof(BaseEntityDto))
            {
                var entityProp = entityType.GetProperty(property.Name, BindingFlags.Instance
                                                                       | BindingFlags.Public
                                                                       | BindingFlags.IgnoreCase);
                if (entityProp == null)
                    continue;
                var staticClassType = typeof(DtoMapper);
                Type[] genericTypes = { property.PropertyType, entityProp.PropertyType}; 
                var genericMethod = staticClassType.GetMethod("UpdateEntity");
                var constructedMethod = genericMethod.MakeGenericMethod(genericTypes);
                var res =  constructedMethod.Invoke(staticClassType, new []{property.GetValue(entity)});
                entityProp.SetValue(entity,res);
                continue;
            }

            entityType
                .GetProperty(property.Name,BindingFlags.Instance 
                                           | BindingFlags.Public
                                           | BindingFlags.IgnoreCase)?
                .SetValue(entity,property.GetValue(dto));
        }
        return entity;

    }
    public static TEntityDto? ToEntityDto<TEntity, TEntityDto>(TEntity? entity) where TEntity : class,new() where TEntityDto : class,new()
    {
        var entityDto = new TEntityDto();
        var entityDtoType = entityDto.GetType();
        if (entity == null)
        {
            return null;
        }
        var entityType = entity.GetType();
        foreach (var property in entityType.GetProperties())
        {
            if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(List<>))
            {
                var typeDto = entityDtoType.GetProperty(property.Name)?.PropertyType.GetGenericArguments().FirstOrDefault();
                if (typeDto == null)
                {
                    continue;
                }
                if (property.GetValue(entity) is IEnumerable list)
                {
                    var dtoList = Activator.CreateInstance(typeof(List<>).MakeGenericType(typeDto))!;
                    foreach (var listItem in list)
                    {
                        var listItemDto = Activator.CreateInstance(typeDto);
                        CopyProperties(listItem, listItemDto!);
                        dtoList.GetType().GetMethod("Add").Invoke(dtoList, new[] { listItemDto });
                    }
                    entityDtoType.GetProperty(property.Name, BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase)?
                        .SetValue(entityDto, dtoList);
                }
                continue;
            }
            var propertyDto = entityDtoType
                .GetProperty(property.Name,BindingFlags.Instance 
                                           | BindingFlags.Public
                                           | BindingFlags.IgnoreCase);
            if (propertyDto == null) 
                continue;
            
            if (property.PropertyType.BaseType == typeof(BaseEntity))
            {
                var staticClassType = typeof(DtoMapper);
                Type[] genericTypes = { property.PropertyType, propertyDto.PropertyType }; 
                var genericMethod = staticClassType.GetMethod("ToEntityDto");
                var constructedMethod = genericMethod.MakeGenericMethod(genericTypes);
               var res =  constructedMethod.Invoke(staticClassType, new []{property.GetValue(entity)});
               propertyDto.SetValue(entityDto,res);
                continue;
            }
            propertyDto.SetValue(entityDto,property.GetValue(entity));
        }
        return entityDto;
    }
}