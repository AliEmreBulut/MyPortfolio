using Portfolio.Application.DTOs.Category;
using Portfolio.Application.DTOs.Project;
using Portfolio.Application.DTOs.Skill;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Services;

public class ProjectService : IProjectService
{
    // özel oluşturduğumuz repoyu kullanıyoruz çünkü join işlemi yapmamız gerek.
    private readonly IProjectRepository _projectRepository;
    private readonly IUnitOfWork _unitOfWork;

    public ProjectService(IProjectRepository projectRepository, IUnitOfWork unitOfWork)
    {
        _projectRepository = projectRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<ProjectResponse>> GetAllProjectsAsync()
    {
        
        var projects = await _projectRepository.GetProjectsWithDetailsAsync();

        return projects.Select(p => MapToResponse(p));
    }

    public async Task<ProjectResponse?> GetProjectByIdAsync(Guid id)
    {
        var project = await _projectRepository.GetProjectWithDetailsByIdAsync(id);
        if (project is null) return null;

        return MapToResponse(project);
    }

    public async Task<ProjectResponse> CreateProjectAsync(CreateProjectRequest request)
    {
        var newProject = new Project
        {
            Title = request.Title,
            ShortSummary = request.ShortSummary,
            DetailedDescription = request.DetailedDescription,
            CoverImageUrl = request.CoverImageUrl,
            GithubUrl = request.GithubUrl,
            LiveUrl = request.LiveUrl,
            DisplayOrder = request.DisplayOrder,
            Status = request.Status,
            
            // çoktan çoka ilişkileri kuruyoruz. Sadece ID'si gelen Guid listesini, veritabanının anlayacağı ProjectCategory ve ProjectSkill varlıklarına dönüştürüyoruz.
            ProjectCategories = request.CategoryIds.Select(cId => new ProjectCategory 
            { 
                CategoryId = cId 
            }).ToList(),
            
            ProjectSkills = request.SkillIds.Select(sId => new ProjectSkill 
            { 
                SkillId = sId 
            }).ToList()
        };

        await _projectRepository.AddAsync(newProject);
        await _unitOfWork.SaveChangesAsync();

        //frontend in eklenen projeyi listede görmesi için id ve title dönüyoruz
        return new ProjectResponse { Id = newProject.Id, Title = newProject.Title }; 
    }

    public async Task UpdateProjectAsync(Guid id, UpdateProjectRequest request)
    {
        // Projeyi ve mevcut ilişkilerini veritabanından çekiyoruz.
        var project = await _projectRepository.GetProjectWithDetailsByIdAsync(id);
        if (project is null) throw new Exception("Project not found");

        project.Title = request.Title;
        project.ShortSummary = request.ShortSummary;
        project.DetailedDescription = request.DetailedDescription;
        project.CoverImageUrl = request.CoverImageUrl;
        project.GithubUrl = request.GithubUrl;
        project.LiveUrl = request.LiveUrl;
        project.DisplayOrder = request.DisplayOrder;
        project.Status = request.Status;
        project.UpdatedAt = DateTime.UtcNow;

        //ilişki güncelleme işlemi mevcut ilişkileri temizle yeni gelenleri ekle.
        project.ProjectCategories.Clear();
        foreach (var cId in request.CategoryIds)
        {
            project.ProjectCategories.Add(new ProjectCategory { ProjectId = id, CategoryId = cId });
        }

        project.ProjectSkills.Clear();
        foreach (var sId in request.SkillIds)
        {
            project.ProjectSkills.Add(new ProjectSkill { ProjectId = id, SkillId = sId });
        }

        _projectRepository.Update(project);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteProjectAsync(Guid id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project is null) throw new Exception("Project not found");

        _projectRepository.Delete(project);
        await _unitOfWork.SaveChangesAsync();
    }

    //DRY prensibi için mapping metodunu private olarak tanımladık.
    private ProjectResponse MapToResponse(Project project)
    {
        return new ProjectResponse
        {
            Id = project.Id,
            Title = project.Title,
            ShortSummary = project.ShortSummary,
            DetailedDescription = project.DetailedDescription,
            CoverImageUrl = project.CoverImageUrl,
            GithubUrl = project.GithubUrl,
            LiveUrl = project.LiveUrl,
            DisplayOrder = project.DisplayOrder,
            Status = project.Status,
            CreatedAt = project.CreatedAt,
            UpdatedAt = project.UpdatedAt,
            //ilişki tablolarından category ve skill varlıklarına ulaşıyoruz
            Categories = project.ProjectCategories.Select(pc => new CategoryResponse
            {
                Id = pc.Category.Id,
                Name = pc.Category.Name
            }).ToList(),
            Skills = project.ProjectSkills.Select(ps => new SkillResponse
            {
                Id = ps.Skill.Id,
                Name = ps.Skill.Name,
                IconName = ps.Skill.IconName,
                IconUrl = ps.Skill.IconUrl,
                Category = ps.Skill.Category
            }).ToList()
        };
    }
}