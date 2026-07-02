using Portfolio.Domain.Enums;

namespace Portfolio.Application.DTOs.Project;

public class CreateProjectRequest
{
    public string Title { get; set; } = string.Empty;
    public string ShortSummary { get; set; } = string.Empty;
    public string DetailedDescription { get; set; } = string.Empty;
    public string CoverImageUrl { get; set; } = string.Empty;
    public string GithubUrl { get; set; } = string.Empty;
    public string LiveUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public ProjectStatus Status { get; set; }

    public List<Guid> CategoryIds { get; set; } = new();
    public List<Guid> SkillIds { get; set; } = new();
}