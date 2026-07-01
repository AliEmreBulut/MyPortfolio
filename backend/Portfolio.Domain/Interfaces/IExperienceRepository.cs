using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Interfaces;

public interface IExperienceRepository : IGenericRepository<Experience>
{
    Task<IEnumerable<Experience>> GetAllOrderedByDateDescendingAsync();
}