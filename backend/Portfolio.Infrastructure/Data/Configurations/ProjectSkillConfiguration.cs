using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data.Configurations;


public class ProjectSkillConfiguration : IEntityTypeConfiguration<ProjectSkill>
{
    public void Configure(EntityTypeBuilder<ProjectSkill> builder)
    {
        //Composite primary key
        builder.HasKey(ps  => new {ps.ProjectId, ps.SkillId});

        //Project tablosuyla bağlantı
        builder.HasOne(ps => ps.Project).WithMany(p => p.ProjectSkills).HasForeignKey(ps => ps.ProjectId);

        //Skill tablosuyla bağlantı
        builder.HasOne(ps => ps.Skill).WithMany(s => s.ProjectSkills).HasForeignKey(ps => ps.SkillId);

    }
}