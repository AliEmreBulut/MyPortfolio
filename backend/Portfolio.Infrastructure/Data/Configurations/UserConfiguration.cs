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

        //username unique olmalı
        builder.HasIndex(x => x.Username).IsUnique();


        //Property tanımları

        //username zorunlu ve max 50
        builder.Property(x => x.Username).IsRequired().HasMaxLength(50);

        //password zorunlu (byte array olduğu için MaxLength kaldırıldı)
        builder.Property(x => x.PasswordHash).IsRequired();
        builder.Property(x => x.PasswordSalt).IsRequired();


    }
}