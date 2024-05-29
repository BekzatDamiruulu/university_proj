using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;

namespace UniversitySolution.BusinessLogic.Services;
 
public class FacultyService : CommonService<Faculty>
{
    private readonly ICommonRepository<Faculty> _facultyRepo;
    public FacultyService(ICommonRepository<Faculty> commonRepository ) : base(commonRepository)
    {
        _facultyRepo = commonRepository;
    }

    public override Faculty Create(Faculty entity)
    {
        
       var facultyData = _facultyRepo.ReadAll(new List<FilterObject>{new FilterObject(){FilterBy = "Name",FilterConditions = new List<string>(){"exact"},FilterValue = entity.Name}},limit:2);
       
       if (facultyData!.Result?.FirstOrDefault() != null)
       {
           throw new Exception(facultyData.Result.FirstOrDefault()?.Name+" already exists , choose another name");
       }
       return base.Create(entity);
    }

}