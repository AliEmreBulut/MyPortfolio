using System;
using System.Collections.Generic;
using Portfolio.Domain.Enums;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class Skill : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public string Name { get; set; } = string.Empty;
    public string IconName { get; set; } = string.Empty;
    public string IconUrl { get; set; } = string.Empty;
    public SkillCategory Category { get; set; } = SkillCategory.Other;

    // Navigation Property
    //Bir yeteneğin birden fazla projesi olabilir.
    public ICollection<ProjectSkill> ProjectSkills { get; set; } = new List<ProjectSkill>();
}
