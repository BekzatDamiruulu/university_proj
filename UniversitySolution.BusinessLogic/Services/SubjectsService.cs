using UniversitySolution.BusinessLogic.Common;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;

namespace UniversitySolution.BusinessLogic.Services;

public class SubjectsService :  CommonService<Subject>
{
    public SubjectsService(ICommonRepository<Subject> commonRepository) : base(commonRepository)
    {
    }
}