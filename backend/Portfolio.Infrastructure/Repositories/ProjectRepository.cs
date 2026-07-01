using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;
using Portfolio.Infrastructure.Data.Contexts;

namespace Portfolio.Infrastructure.Repositories;

public class ProjectRepository : GenericRepository<Project>, IProjectRepository
{
    public ProjectRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<Project?> GetProjectWithDetailsAsync(Guid id)
    {
        return await _context.Projects
            .Include(p => p.ProjectCategories)
            .ThenInclude(pc => pc.Category)
            .Include(p => p.ProjectSkills)
            .ThenInclude(ps => ps.Skill)
            .FirstOrDefaultAsync(p => p.Id == id);
    }
}