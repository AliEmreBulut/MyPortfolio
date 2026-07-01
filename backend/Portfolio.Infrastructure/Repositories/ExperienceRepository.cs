using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;
using Portfolio.Infrastructure.Data.Contexts;

namespace Portfolio.Infrastructure.Repositories;

public class ExperienceRepository : GenericRepository<Experience>, IExperienceRepository
{
    public ExperienceRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Experience>> GetAllOrderedByDateDescendingAsync()
    {
        // En yeni tarihliden en eskiye doğru sıralar
        return await _context.Experiences
            .OrderByDescending(e => e.StartDate)
            .ToListAsync();
    }
}