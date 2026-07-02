using System;
using System.Collections.Generic;
using Portfolio.Domain.Enums;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class Project : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public string Title { get; set; } = string.Empty;
    public string? ShortSummary { get; set; }
    public string? DetailedDescription { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? GithubUrl { get; set; }
    public string? LiveUrl { get; set; }
    public int DisplayOrder { get; set; }
    public ProjectStatus Status { get; set; } = ProjectStatus.InProgress;
    
    // Navigation Properties
    //Bir projenin birden fazla kategorisi olabilir
    public ICollection<ProjectCategory> ProjectCategories { get; set; } = new List<ProjectCategory>();
    //Bir projenin birden fazla yeteneği olabilir
    public ICollection<ProjectSkill> ProjectSkills { get; set; } = new List<ProjectSkill>();
}
