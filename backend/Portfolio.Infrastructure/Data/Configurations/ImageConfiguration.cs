using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data.Configurations;

public class ProjectImageConfiguration : IEntityTypeConfiguration<ProjectImage>
{
    public void Configure(EntityTypeBuilder<ProjectImage> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.ImageUrl).IsRequired().HasMaxLength(1000);
        
        // birden çoka ilişkisini kuruyoruz
        builder.HasOne(x => x.Project)
               .WithMany(p => p.ProjectImages)
               .HasForeignKey(x => x.ProjectId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}