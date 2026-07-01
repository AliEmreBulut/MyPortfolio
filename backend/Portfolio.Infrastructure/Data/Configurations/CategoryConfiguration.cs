using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        //Primary key
        builder.HasKey(c => c.Id);

        //Name unique olmalı
        builder.Property(c => c.Name).IsRequired().HasMaxLength(100);

        builder.HasIndex(c => c.Name).IsUnique();

        //Tablo bağlantıları (Bir kategoriden birden fazla proje olabilir)
        builder.HasMany(c => c.ProjectCategories).WithOne(pc => pc.Category).HasForeignKey(pc => pc.CategoryId);
    }
}