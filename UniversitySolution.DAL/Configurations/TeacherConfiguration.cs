using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UniversitySolution.BusinessLogic.Entities;

namespace UniversitySolution.DAL.Configurations;

public class TeacherConfiguration : IEntityTypeConfiguration<Teacher>
{
    public void Configure(EntityTypeBuilder<Teacher> builder)
    {
        builder.ToTable("Teachers")
            .HasOne(t => t.Group)
            .WithOne(g => g.Teacher)
            .HasForeignKey<Teacher>(t => t.GroupId).OnDelete(DeleteBehavior.SetNull);
    }
}