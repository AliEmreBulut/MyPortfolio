using Portfolio.Domain.Enums;

namespace Portfolio.Application.DTOs.Project;

public class UpdateProjectRequest
{
    public string Title { get; set; } = string.Empty;
    public string? ShortSummary { get; set; }
    public string? DetailedDescription { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? GithubUrl { get; set; }
    public string? LiveUrl { get; set; }
    public int DisplayOrder { get; set; }
    public ProjectStatus Status { get; set; }

    public List<Guid> CategoryIds { get; set; } = new();
    public List<Guid> SkillIds { get; set; } = new();
}