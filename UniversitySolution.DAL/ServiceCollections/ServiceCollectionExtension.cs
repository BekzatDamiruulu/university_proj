using Microsoft.Extensions.DependencyInjection;
using UniversitySolution.BusinessLogic.Common.CommonInterfaces;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.DAL.Ado.Repositories;
using UniversitySolution.DAL.Repositories;

namespace UniversitySolution.DAL.ServiceCollections;

public static class ServiceCollectionExtension
{
    public static void AddServicesEf(this IServiceCollection collection)
    {
        collection.AddScoped<ICommonRepository<Group>, GroupRepository>();
        collection.AddScoped<ICommonRepository<Teacher>, TeacherRepository>();
        collection.AddScoped<ICommonRepository<Student>, StudentsRepository>();
        collection.AddScoped<ICommonRepository<Subject>, SubjectsRepository>();
        collection.AddScoped<ICommonRepository<Faculty>, FacultyRepository>();

        collection.AddScoped<AdoBaseRepository<Faculty>>();
        collection.AddScoped<AdoBaseRepository<Group>>();
        collection.AddScoped<AdoBaseRepository<Student>>();
        collection.AddScoped<AdoBaseRepository<Teacher>>();
        collection.AddScoped<AdoBaseRepository<Subject>>();
        
    }
}