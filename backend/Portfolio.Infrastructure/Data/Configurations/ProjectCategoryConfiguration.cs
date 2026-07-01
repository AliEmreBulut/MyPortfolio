using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data.Configurations;

public class ProjectCategoryConfiguration : IEntityTypeConfiguration<ProjectCategory>
{
    public void Configure(EntityTypeBuilder<ProjectCategory> builder)
    {
        //Composite primary key
        builder.HasKey(pc => new { pc.ProjectId, pc.CategoryId });

        //Project tablosuyla bağlantı
        builder.HasOne(pc => pc.Project).WithMany(p => p.ProjectCategories).HasForeignKey(pc => pc.ProjectId);

        //Category tablosuyla bağlantı
        builder.HasOne(pc => pc.Category).WithMany(c => c.ProjectCategories).HasForeignKey(pc => pc.CategoryId);
    }
}
