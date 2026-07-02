using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Interfaces;

public interface IProjectRepository : IGenericRepository<Project>
{
    Task<IEnumerable<Project>> GetProjectsWithDetailsAsync();
    Task<Project?> GetProjectWithDetailsByIdAsync(Guid id);
}