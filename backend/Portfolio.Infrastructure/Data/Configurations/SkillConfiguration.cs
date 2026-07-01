using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data.Configurations;

public class SkillConfiguration : IEntityTypeConfiguration<Skill>
{
    public void Configure(EntityTypeBuilder<Skill> builder)
    {
        //Primary key
        builder.HasKey(s => s.Id);

        //Name unique olmalı
        builder.Property(s => s.Name).IsRequired().HasMaxLength(100);

        builder.HasIndex(s => s.Name).IsUnique();

        //Category enum tanımı
        builder.Property(s => s.Category).IsRequired();

        //Tablo bağlantıları (Bir skill birden fazla proje ile ilişkilendirilebilir)
        builder.HasMany(s => s.ProjectSkills).WithOne(ps => ps.Skill).HasForeignKey(ps => ps.SkillId);
    }
}