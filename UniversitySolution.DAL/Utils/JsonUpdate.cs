using System.Reflection;
using System.Text.Json;
using UniversitySolution.BusinessLogic.Entities;

namespace UniversitySolution.DAL.Utils;

public static class JsonUpdate
{

    public static void UpdateEntity<TEntity>(DataContext dataContext, TEntity entity, string jsonArrayWithFieldsValue =
        @"[{""fieldName"": ""Id"", ""fieldValue"": ""1""}]") where TEntity : BaseEntity, new()
    {
        var type = typeof(TEntity);
        var rootElem = JsonDocument.Parse(jsonArrayWithFieldsValue).RootElement;
        if (rootElem.ValueKind != JsonValueKind.Array)
            throw new Exception("update json must be array !");
        foreach (var elem in rootElem.EnumerateArray())
        {
            var fieldValue = elem.GetProperty("fieldValue");
            var fieldName = elem.GetProperty("fieldName");
            if (fieldName.GetString() == null)
            {
                throw new Exception("cannot get fieldName !");
            }

            var propEntity = type.GetProperty(fieldName.GetString()!,
                BindingFlags.Default | BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase);
            if (propEntity == null)
            {
                throw new Exception($"{fieldName.GetString()}  is not found !");
            }

            switch (fieldValue.ValueKind)
            {
                case JsonValueKind.Null:
                    if (propEntity.PropertyType.Name.ToLower().Contains("nullable"))
                    {
                        propEntity.SetValue(entity, null);
                        SetStateModified(propEntity.Name);
                        break;
                    }
                    throw new Exception($"this {fieldName} cannot except null !");
                case JsonValueKind.Number:
                    if (propEntity.PropertyType.Name.ToLower().Contains("int") ||
                        propEntity.PropertyType.Name.ToLower().Contains("nullable"))
                    {
                        var propType = propEntity.PropertyType.Name;
                        if (Nullable.GetUnderlyingType(propEntity.PropertyType) != null)
                        {
                            propType = Nullable.GetUnderlyingType(propEntity.PropertyType)?.Name;
                        }

                        var method = elem.GetType().GetMethod("Get" + propType,
                            BindingFlags.IgnoreCase | BindingFlags.Default | BindingFlags.Instance |
                            BindingFlags.Public);
                        if (method == null)
                        {
                            throw new Exception("method is null");
                        }
                        var value = method.Invoke(fieldValue, null);
                        propEntity.SetValue(entity, value);
                        SetStateModified(propEntity.Name);
                    }
                    break;
                case JsonValueKind.String:
                    if (propEntity.PropertyType.Name.ToLower().Contains("int") ||
                        propEntity.PropertyType.Name.ToLower().Contains("nullable"))
                    {
                        var propType = propEntity.PropertyType;
                        if (Nullable.GetUnderlyingType(propEntity.PropertyType) != null)
                        {
                            propType = Nullable.GetUnderlyingType(propEntity.PropertyType);
                        }

                        var num = fieldValue.GetRawText().Trim('"');
                        var value = Convert.ChangeType(num, propType);
                        propEntity.SetValue(entity, value);
                    }
                    else if (propEntity.PropertyType.Name.ToLower().Contains("string"))
                    {
                        propEntity.SetValue(entity, fieldValue.GetString());
                    }
                    else if (propEntity.PropertyType.Name.ToLower().Contains("date"))
                    {
                        propEntity.SetValue(entity, DateOnly.Parse(fieldValue.GetString()));
                    }
                    SetStateModified(propEntity.Name);
                    break;
            }
        }
        var res = dataContext.Entry(entity);
        return;

        void SetStateModified(string propName)
        {
            dataContext.ChangeTracker.TrackGraph(entity, e =>
            {
                if (e.Entry.Entity is TEntity)
                {
                    e.Entry.Property(propName).IsModified = true;
                }
            });
        }
  

    }
}