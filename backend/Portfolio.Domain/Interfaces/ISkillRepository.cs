using Portfolio.Domain.Entities;
using Portfolio.Domain.Enums;

namespace Portfolio.Domain.Interfaces;

public interface ISkillRepository : IGenericRepository<Skill>
{
    Task<IEnumerable<Skill>> GetSkillsByCategoryAsync(SkillCategory category);
}
