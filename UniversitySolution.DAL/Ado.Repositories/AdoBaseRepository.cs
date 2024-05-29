using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Text.RegularExpressions;
using Npgsql;
using UniversitySolution.BusinessLogic.ActionResultEntities;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Utils;
using UniversitySolution.DAL.Extensions;
using Exception = System.Exception;

namespace UniversitySolution.DAL.Ado.Repositories;

public class AdoBaseRepository <T> where T: BaseEntity
{
    private readonly string _connection;
    private readonly string _tableName;
    private readonly string[] _columns;
    private const string I = "\"";
    private readonly DataContext _data;
    public AdoBaseRepository( DataContext context)
    {
        _data = context;
        var entityType= typeof(T);
        if (entityType == null)
        {
            throw new Exception("entity type is null");
        }
        _connection = context.Database.GetDbConnection().ConnectionString ;
        _columns = entityType.GetProperties().Select(p=>p.Name).ToArray();
        _tableName = context.Model.FindEntityType(typeof(T))?.GetTableName()!;
    }
   public string[] GetColumnsName()
    {
        return _columns;
    }
   public async Task<ResultData<Dictionary<string,object>>> ReadAllWithDefColumns(List<string>? propNames=null,string? filter=null
        ,int limit = 10, int offset = 0, string orderType = "ASC"
        , string orderBy = "Id",bool readAll = false
        )
   {
       if (_connection == null || _connection == "")
       {
           throw new NullReferenceException("CONNECTION STRING IS NULL");
       }
       var containColumns =new List<string>();
       if (!_columns.Contains(orderBy))
       {
           orderBy = "Id";
       }
       containColumns.AddRange(_columns);
       if (propNames?.Count > 0)
       {
           containColumns.Clear();
           foreach (var propName in propNames)
           {
               containColumns.AddRange( _columns.Where(c => string.Equals(c, propName, StringComparison.CurrentCultureIgnoreCase)).ToList());
           }
           if (containColumns.Count == 0)
           {
               containColumns.AddRange(_columns);
           }
       }

       var queryWithFilter = "";
       if (filter != null && !string.IsNullOrEmpty(filter))
       {
           var queryFilterObject = JsonDeserializer.ToFilterObjectsList(filter);
           var filterQuery = _data.Set<T>().Filter(queryFilterObject)?.ToQueryString();

           var selectIndex = filterQuery.IndexOf("SELECT");
           var fromIndex = filterQuery.IndexOf("FROM");

           if (selectIndex != -1 && fromIndex != -1)
           {
               var subst = filterQuery.Substring(selectIndex + "SELECT".Length, fromIndex - (selectIndex + "SELECT".Length));
               var sbs = subst.Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries);

               var columns = containColumns.Select(item => sbs.Where((s, i) => Regex.Matches(s, @"\w*\.""([^""]+)""")[0].Groups[1].Value == item)).Select(r => r.FirstOrDefault()).ToList();
               var columnsQuery = string.Join(", ", columns);
               var removedQuery = filterQuery.Remove(selectIndex + "SELECT".Length,fromIndex-"SELECT".Length-1).Insert("SELECT".Length,$" {columnsQuery} ");
               queryWithFilter = removedQuery;
           }
       }

       await using var dataSource = NpgsqlDataSource.Create(_connection);
        
        var take = $" limit {limit} offset {offset}";
        if (readAll)
        {
            take = "";
        }
        
        var query = $"SELECT {string.Join(", ",containColumns.Select(c => $"{I}{   c}{I}"))} FROM {I}{_tableName}{I}  order by {I}{orderBy}{I} {orderType} {take}";
        if (!string.IsNullOrEmpty(queryWithFilter) && queryWithFilter.Length > 5)
        {
            query = queryWithFilter+$" order by {I}{orderBy}{I} {orderType} {take}";
        }

        Console.WriteLine(query);
        await using var command = 
            dataSource.CreateCommand(query);
        await using var reader =await  command.ExecuteReaderAsync();
        var listDictionary = new List<Dictionary<string, object>>();
        while (await reader.ReadAsync())
        {
            var dic =  new Dictionary<string, object>();
            foreach (var column in containColumns)
            {
                dic[column] = reader[column];
            }
            listDictionary.Add(dic);
        } 

        var commandCount = dataSource.CreateCommand($"SELECT COUNT(*) FROM {I}{_tableName}{I}");
        var readerCount =await commandCount.ExecuteReaderAsync();
        var resultData = new ResultData<Dictionary<string, object>>(){Result = listDictionary,Count = listDictionary.Count};
        
        while(await readerCount.ReadAsync())
        {
            resultData.Total = readerCount.GetInt32(0);
        }

        await readerCount.DisposeAsync();
        await dataSource.DisposeAsync();
        return resultData;
   }
}

