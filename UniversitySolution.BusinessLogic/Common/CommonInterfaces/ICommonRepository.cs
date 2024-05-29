

using UniversitySolution.BusinessLogic.ActionResultEntities;

namespace UniversitySolution.BusinessLogic.Common.CommonInterfaces;

public interface ICommonRepository<TEntity> where TEntity : class
{
    TEntity? GetById(long id)  ;
    ResultData<TEntity>? ReadAll(List<FilterObject> filterObjects=null,int limit=20,int offset = 0,string orderType="ASC",string orderBy= "Id") ;
    void Delete(long id);
    TEntity Create(TEntity entity);

    TEntity Update(TEntity entity, string jsonForUpdate)
    {
        return null;
    }
}