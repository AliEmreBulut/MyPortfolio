using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces;

public interface IProjectService
{
    Task<IEnumerable<Project>> GetAllProjectsAsync();
    Task<Project?> GetProjectByIdAsync(Guid id);
    Task<Project> CreateProjectAsync(Project project);
    Task UpdateProjectAsync(Project project);
    Task DeleteProjectAsync(Guid id);
}
