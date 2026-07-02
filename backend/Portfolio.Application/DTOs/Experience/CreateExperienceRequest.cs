using Portfolio.Domain.Enums;

namespace Portfolio.Application.DTOs.Experience;

public class CreateExperienceRequest
{
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Location { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public ExperienceType Type { get; set; }
    public int DisplayOrder { get; set; }
    public Guid UserId { get; set; }
}
