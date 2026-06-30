using System;
using System.Collections.Generic;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class Project : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public string Title { get; set; } = string.Empty;
    public string ShortSummary { get; set; } = string.Empty;
    public string DetailedDescription { get; set; } = string.Empty;
    public string CoverImageUrl { get; set; } = string.Empty;
    public string GithubUrl { get; set; } = string.Empty;
    public string LiveUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    
    // Navigation Properties
    public ICollection<ProjectCategory> ProjectCategories { get; set; } = new List<ProjectCategory>();
    public ICollection<ProjectSkill> ProjectSkills { get; set; } = new List<ProjectSkill>();
}
