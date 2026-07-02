using Portfolio.Application.DTOs.Skill;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Enums;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Services;

public class SkillService : ISkillService
{
    private readonly IGenericRepository<Skill> _skillRepository;
    private readonly IUnitOfWork _unitOfWork;

    // Dependecy injection uygulayarak reposiitory ve UOW'u içeriye çekiyoruz.
    public SkillService(IGenericRepository<Skill> skillRepository, IUnitOfWork unitOfWork)
    {
        _skillRepository = skillRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<SkillResponse>> GetAllSkillsAsync()
    {
        var skills = await _skillRepository.GetAllAsync();
        
        // Entityden DTOya dönüşüm yani veritabanından gelen veriyi dış dünyanın göreceği güvenli formata dönüştürüyoruz.
        return skills.Select(s => new SkillResponse
        {
            Id = s.Id,
            Name = s.Name,
            IconName = s.IconName,
            IconUrl = s.IconUrl,
            Category = s.Category
        });
    }

    public async Task<IEnumerable<SkillResponse>> GetSkillsByCategoryAsync(SkillCategory category)
    {
        var skills = await _skillRepository.FindAsync(s => s.Category == category);
        
        return skills.Select(s => new SkillResponse
        {
            Id = s.Id,
            Name = s.Name,
            IconName = s.IconName,
            IconUrl = s.IconUrl,
            Category = s.Category
        });
    }

    public async Task<SkillResponse?> GetSkillByIdAsync(Guid id)
    {
        var skill = await _skillRepository.GetByIdAsync(id);
        if (skill is null) return null; //Eğer kullanıcı veritabanında olmayan bir id girerse null döndürür. (Kullanıcıya id yok diyebiliriz.)

        return new SkillResponse
        {
            Id = skill.Id,
            Name = skill.Name,
            IconName = skill.IconName,
            IconUrl = skill.IconUrl,
            Category = skill.Category
        };
    }


    //Bu kısımda dışarıdan CreateSkillRequest adında sadece kullanıcının girdiği bilgileri içeren bir paket geliyor. Biz bu paketi önce Entity formatına çeviriyoruz daha sonrasında SQLe gönderiyoruz en son kaydettikten sonra da veritabanında oluşan yeni id ile beraber geri dönüyoruz.
    public async Task<SkillResponse> CreateSkillAsync(CreateSkillRequest request)
    {
        // DTO -- Entity dönüşümü
        var newSkill = new Skill
        {
            Name = request.Name,
            IconName = request.IconName,
            IconUrl = request.IconUrl,
            Category = request.Category
        };

        await _skillRepository.AddAsync(newSkill);
        await _unitOfWork.SaveChangesAsync(); // Veritabanına yaz!

        // Kayıt sonrası oluşan Id ile birlikte geriye Response dönüyoruz
        return new SkillResponse
        {
            Id = newSkill.Id,
            Name = newSkill.Name,
            IconName = newSkill.IconName,
            IconUrl = newSkill.IconUrl,
            Category = newSkill.Category
        };
    }

    public async Task UpdateSkillAsync(Guid id, UpdateSkillRequest request)
    {
        var skill = await _skillRepository.GetByIdAsync(id);
        if (skill is null) 
            throw new Exception("Skill not found"); // Buraya custom exception yazabiliriz.(Ör: NotFoundException)

        // Var olan Entity'yi güncelliyoruz
        skill.Name = request.Name;
        skill.IconName = request.IconName;
        skill.IconUrl = request.IconUrl;
        skill.Category = request.Category;
        skill.UpdatedAt = DateTime.UtcNow;

        _skillRepository.Update(skill);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteSkillAsync(Guid id)
    {
        var skill = await _skillRepository.GetByIdAsync(id);
        if (skill is null) 
            throw new Exception("Skill not found");

        _skillRepository.Delete(skill);
        await _unitOfWork.SaveChangesAsync();
    }
}