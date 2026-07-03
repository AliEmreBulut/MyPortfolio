using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        //Primary key
        builder.HasKey(x => x.Id);

        builder.HasIndex(x => x.Username).IsUnique();

        builder.Property(x => x.Username).IsRequired().HasMaxLength(50);

        //password zorunlu
        builder.Property(x => x.PasswordHash).IsRequired();
        builder.Property(x => x.PasswordSalt).IsRequired();


    }
}