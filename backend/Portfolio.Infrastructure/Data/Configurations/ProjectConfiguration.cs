using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data.Configurations;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        //Primary key
        builder.HasKey(p => p.Id);

        //Property tanımları
        builder.Property(p => p.Title).IsRequired().HasMaxLength(200);
        builder.Property(p => p.ShortSummary).HasMaxLength(500);
        builder.Property(p => p.DetailedDescription).HasMaxLength(5000);
        builder.Property(p => p.CoverImageUrl).HasMaxLength(500);
        builder.Property(p => p.GithubUrl).HasMaxLength(500);
        builder.Property(p => p.LiveUrl).HasMaxLength(500);
        builder.Property(p => p.DisplayOrder).HasDefaultValue(0);
        builder.Property(p => p.Status).IsRequired();

        //Tablo bağlantıları (Bir projenin birden fazla kategorisi ve skill'i olabilir)
        builder.HasMany(p => p.ProjectCategories).WithOne(pc => pc.Project).HasForeignKey(pc => pc.ProjectId);
        builder.HasMany(p => p.ProjectSkills).WithOne(ps => ps.Project).HasForeignKey(ps => ps.ProjectId);
    }
}
