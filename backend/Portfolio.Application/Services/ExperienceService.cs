using Portfolio.Application.DTOs.Experience;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;
using Portfolio.Domain.Exceptions;

namespace Portfolio.Application.Services;

public class ExperienceService : IExperienceService
{
    private readonly IGenericRepository<Experience> _experienceRepository;
    private readonly IUnitOfWork _unitOfWork;

    public ExperienceService(IGenericRepository<Experience> experienceRepository, IUnitOfWork unitOfWork)
    {
        _experienceRepository = experienceRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<ExperienceResponse>> GetAllExperiencesAsync()
    {
        var experiences = await _experienceRepository.GetAllAsync();
        
        // Deneyimleri display order'a göre sıralıyoruz.
        return experiences
            .OrderBy(e => e.DisplayOrder)
            .Select(e => new ExperienceResponse
            {
                Id = e.Id,
                Title = e.Title,
                Company = e.Company,
                Description = e.Description,
                Location = e.Location,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                Type = e.Type,
                DisplayOrder = e.DisplayOrder
            });
    }

    public async Task<ExperienceResponse?> GetExperienceByIdAsync(Guid id)
    {
        var experience = await _experienceRepository.GetByIdAsync(id);
        if (experience is null) return null;

        return new ExperienceResponse
        {
            Id = experience.Id,
            Title = experience.Title,
            Company = experience.Company,
            Description = experience.Description,
            Location = experience.Location,
            StartDate = experience.StartDate,
            EndDate = experience.EndDate,
            Type = experience.Type,
            DisplayOrder = experience.DisplayOrder
        };
    }

    public async Task<ExperienceResponse> CreateExperienceAsync(CreateExperienceRequest request)
    {
        var newExperience = new Experience
        {
            Title = request.Title,
            Company = request.Company,
            Description = request.Description,
            Location = request.Location,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Type = request.Type,
            DisplayOrder = request.DisplayOrder,
            UserId = request.UserId
        };

        await _experienceRepository.AddAsync(newExperience);
        await _unitOfWork.SaveChangesAsync();

        return new ExperienceResponse
        {
            Id = newExperience.Id,
            Title = newExperience.Title,
            Company = newExperience.Company,
            Description = newExperience.Description,
            Location = newExperience.Location,
            StartDate = newExperience.StartDate,
            EndDate = newExperience.EndDate,
            Type = newExperience.Type,
            DisplayOrder = newExperience.DisplayOrder
        };
    }

    public async Task UpdateExperienceAsync(Guid id, UpdateExperienceRequest request)
    {
        var experience = await _experienceRepository.GetByIdAsync(id);
        if (experience is null) throw new NotFoundException("Experience not found");

        experience.Title = request.Title;
        experience.Company = request.Company;
        experience.Description = request.Description;
        experience.Location = request.Location;
        experience.StartDate = request.StartDate;
        experience.EndDate = request.EndDate;
        experience.Type = request.Type;
        experience.DisplayOrder = request.DisplayOrder;
        experience.UpdatedAt = DateTime.UtcNow;

        _experienceRepository.Update(experience);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteExperienceAsync(Guid id)
    {
        var experience = await _experienceRepository.GetByIdAsync(id);
        if (experience is null) throw new NotFoundException("Experience not found");

        _experienceRepository.Delete(experience);
        await _unitOfWork.SaveChangesAsync();
    }
}