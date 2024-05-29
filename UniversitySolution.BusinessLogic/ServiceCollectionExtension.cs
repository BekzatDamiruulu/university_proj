using Microsoft.Extensions.DependencyInjection;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.Interfaces.IServices;
using UniversitySolution.BusinessLogic.Services;

namespace UniversitySolution.BusinessLogic;

public static class ServiceCollectionExtension
{
    public static void AddCoreServices(this IServiceCollection collection)
    {
        collection.AddScoped<ICommonService<Group>, GroupService>();
        collection.AddScoped<ICommonService<Teacher>, TeacherService>();
        collection.AddScoped<ICommonService<Student>, StudentsService>();
        collection.AddScoped<ICommonService<Subject>, SubjectsService>();
        collection.AddScoped<ICommonService<Faculty>, FacultyService>();
    }
}