using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces;

public interface ISkillService
{
    Task<IEnumerable<Skill>> GetAllSkillsAsync();
    Task<Skill?> GetSkillByIdAsync(Guid id);
    Task<Skill> CreateSkillAsync(Skill skill);
    Task UpdateSkillAsync(Skill skill);
    Task DeleteSkillAsync(Guid id);
}
