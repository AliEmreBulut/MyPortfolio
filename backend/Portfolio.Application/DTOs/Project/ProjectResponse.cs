using Portfolio.Application.DTOs.Category;
using Portfolio.Application.DTOs.Skill;
using Portfolio.Domain.Enums;

namespace Portfolio.Application.DTOs.Project;

public class ProjectResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ShortSummary { get; set; } = string.Empty;
    public string DetailedDescription { get; set; } = string.Empty;
    public string CoverImageUrl { get; set; } = string.Empty;
    public string GithubUrl { get; set; } = string.Empty;
    public string LiveUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public ProjectStatus Status { get; set; }
    
    public List<CategoryResponse> Categories { get; set; } = new();
    public List<SkillResponse> Skills { get; set; } = new();
    
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}