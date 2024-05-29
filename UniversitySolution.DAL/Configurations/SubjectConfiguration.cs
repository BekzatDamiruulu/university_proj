using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.enums;

namespace UniversitySolution.DAL.Configurations;

public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder.Property(p => p.Day)
            .HasConversion(new EnumToStringConverter<Days>());
    }
}