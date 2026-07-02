using Portfolio.Application.DTOs.Skill;

namespace Portfolio.Application.Interfaces;

public interface ISkillService
{
    Task<IEnumerable<SkillResponse>> GetAllSkillsAsync();
    Task<SkillResponse?> GetSkillByIdAsync(Guid id);
    Task<SkillResponse> CreateSkillAsync(CreateSkillRequest request);
    Task UpdateSkillAsync(Guid id, UpdateSkillRequest request);
    Task DeleteSkillAsync(Guid id);
}
