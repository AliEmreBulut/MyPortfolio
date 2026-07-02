using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Portfolio.Application.DTOs.Experience;

namespace Portfolio.Application.Interfaces;

public interface IExperienceService
{
    Task<IEnumerable<ExperienceResponse>> GetAllExperiencesAsync();
    Task<ExperienceResponse?> GetExperienceByIdAsync(Guid id);
    Task<ExperienceResponse> CreateExperienceAsync(CreateExperienceRequest request);
    Task UpdateExperienceAsync(Guid id, UpdateExperienceRequest request);
    Task DeleteExperienceAsync(Guid id);
}