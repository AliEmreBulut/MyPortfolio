using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data.Configurations;

public class ExperienceConfiguration : IEntityTypeConfiguration<Experience>
{
    public void Configure(EntityTypeBuilder<Experience> builder)
    {
        //Primary key
        builder.HasKey(e => e.Id);

        //Property tanımları
        builder.Property(e => e.Title).IsRequired().HasMaxLength(200);

        builder.Property(e => e.Company).IsRequired().HasMaxLength(200);

        builder.Property(e => e.Description).HasMaxLength(1000);
        builder.Property(e => e.Type).IsRequired();

        builder.Property(e => e.StartDate).IsRequired();
        

        //Tablo bağlantıları (Bir deneyim bir kullanıcıya aittir)
        builder.HasOne(e => e.User).WithMany(u => u.Experiences).HasForeignKey(e => e.UserId);
    }
}