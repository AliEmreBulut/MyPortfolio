using Portfolio.Domain.Enums;

namespace Portfolio.Application.DTOs.Skill;

// Şu anlık Create ile aynı ama ileride sadece bazı alanların güncellenmesine izin vermek isteyebiliriz o yüzden ayrı tutmak daha mantıklı.
public class UpdateSkillRequest
{
    public string Name { get; set; } = string.Empty;
    public string? IconName { get; set; }
    public string? IconUrl { get; set; }
    public SkillCategory Category { get; set; }
}