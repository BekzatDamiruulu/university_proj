using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UniversitySolution.BusinessLogic.Entities;

namespace UniversitySolution.DAL.Configurations;

public class StudentConfiguration : IEntityTypeConfiguration<Student>
{
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        builder.ToTable("Students")
            .HasOne(s => s.Group)
            .WithMany(group => group.Students)
            .HasForeignKey(s => s.GroupId);
    }
}