namespace UniversitySolution.BusinessLogic.ActionResultEntities;

public class ResultData<TEntity> where TEntity : class 
{
    public int Status { get; set; }
    public int Offset { get; set; }
    public int Limit { get; set; }
    public int Total { get; set; }
    public int Count { get; set; }
    public List<TEntity>? Result { get; set; }
}