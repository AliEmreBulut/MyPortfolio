using Portfolio.Application.DTOs.Skill;
using Portfolio.Domain.Enums;

namespace Portfolio.Application.Interfaces;

public interface ISkillService
{
    Task<IEnumerable<SkillResponse>> GetAllSkillsAsync();
    Task<IEnumerable<SkillResponse>> GetSkillsByCategoryAsync(SkillCategory category);
    Task<SkillResponse?> GetSkillByIdAsync(Guid id);
    Task<SkillResponse> CreateSkillAsync(CreateSkillRequest request);
    Task UpdateSkillAsync(Guid id, UpdateSkillRequest request);
    Task DeleteSkillAsync(Guid id);
}
