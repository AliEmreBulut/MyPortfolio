using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Interfaces;

public interface IProjectRepository : IGenericRepository<Project>
{
    Task<Project?> GetProjectWithDetailsAsync(Guid id);
}       