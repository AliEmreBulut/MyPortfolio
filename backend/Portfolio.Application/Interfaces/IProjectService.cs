using Portfolio.Application.DTOs.Project;

namespace Portfolio.Application.Interfaces;

public interface IProjectService
{
    Task<IEnumerable<ProjectResponse>> GetAllProjectsAsync();
    Task<ProjectResponse?> GetProjectByIdAsync(Guid id);
    Task<ProjectResponse> CreateProjectAsync(CreateProjectRequest request);
    Task UpdateProjectAsync(Guid id, UpdateProjectRequest request);
    Task DeleteProjectAsync(Guid id);
}
