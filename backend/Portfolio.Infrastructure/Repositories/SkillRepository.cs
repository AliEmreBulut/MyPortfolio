using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Enums;
using Portfolio.Domain.Interfaces;
using Portfolio.Infrastructure.Data.Contexts;

namespace Portfolio.Infrastructure.Repositories;

public class SkillRepository : GenericRepository<Skill>, ISkillRepository
{
    public SkillRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Skill>> GetSkillsByCategoryAsync(SkillCategory category)
    {
        return await _context.Skills
            .Where(s => s.Category == category)
            .ToListAsync();
    }
}