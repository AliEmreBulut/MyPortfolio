using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;
using Portfolio.Infrastructure.Data.Contexts;

namespace Portfolio.Infrastructure.Repositories;

public class PromptLogRepository : GenericRepository<PromptLog>, IPromptLogRepository
{
    public PromptLogRepository(ApplicationDbContext context) : base(context)
    {
    }
}
