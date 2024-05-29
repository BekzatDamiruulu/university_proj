
using UniversitySolution.BusinessLogic.ActionResultEntities;

namespace UniversitySolution.BusinessLogic.Common.CommonInterfaces;

public interface ICommonService<TEntity> where TEntity : class
{
    ResultData<TEntity>? ReadAll(List<FilterObject> filterObjects= null,int limit=20,int offset = 0,string orderType="ASC",string orderBy= "Id");
    TEntity GetById(long id);
    void Delete(long id);
    TEntity Create(TEntity entity);
    TEntity Update(long id,string jsonArrayWithFieldsValue=@"[{""fieldName"": """", ""fieldValue"": """"}]");
}