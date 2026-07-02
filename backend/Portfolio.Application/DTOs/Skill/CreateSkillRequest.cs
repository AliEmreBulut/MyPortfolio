using Portfolio.Domain.Enums;

namespace Portfolio.Application.DTOs.Skill;

public class CreateSkillRequest
{
    public string Name { get; set; } = string.Empty;
    public string? IconName { get; set; }
    public string? IconUrl { get; set; }
    public SkillCategory Category { get; set; }
}
