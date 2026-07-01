using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data.Configurations;

public class PromptLogConfiguration : IEntityTypeConfiguration<PromptLog>
{
    public void Configure(EntityTypeBuilder<PromptLog> builder)
    {
        //Primary key
        builder.HasKey(p => p.Id);

        

        //Property tanımları
        builder.Property(p => p.Prompt).IsRequired();
    }
}
