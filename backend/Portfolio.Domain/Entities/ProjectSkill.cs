using System;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class ProjectSkill : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // Foreign Keys
    public Guid ProjectId { get; set; }
    public Guid SkillId { get; set; }

    // Navigation Properties
    public Project Project { get; set; } = null!;
    public Skill Skill { get; set; } = null!;
}
