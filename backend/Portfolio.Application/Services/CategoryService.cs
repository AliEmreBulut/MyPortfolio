using Portfolio.Application.DTOs.Category;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Exceptions;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly IGenericRepository<Category> _categoryRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CategoryService(IGenericRepository<Category> categoryRepository, IUnitOfWork unitOfWork)
    {
        _categoryRepository = categoryRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<CategoryResponse>> GetAllAsync()
    {
        // Tüm kategorileri veritabanından çek
        var categories = await _categoryRepository.GetAllAsync();
        
        // mapping
        return categories.Select(c => new CategoryResponse
        {
            Id = c.Id,
            Name = c.Name
        });
    }

    public async Task<CategoryResponse?> GetByIdAsync(Guid id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        
        if (category == null) return null;

        return new CategoryResponse
        {
            Id = category.Id,
            Name = category.Name
        };
    }

    public async Task<CategoryResponse> CreateAsync(CreateCategoryRequest request)
    {
        var category = new Category
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            CreatedAt = DateTime.UtcNow
        };

        await _categoryRepository.AddAsync(category);
        await _unitOfWork.SaveChangesAsync();

        return new CategoryResponse
        {
            Id = category.Id,
            Name = category.Name
        };
    }

    public async Task UpdateAsync(UpdateCategoryRequest request)
    {
        var category = await _categoryRepository.GetByIdAsync(request.Id);
        
        if (category == null)
            throw new NotFoundException("Kategori bulunamadı.");

        category.Name = request.Name;
        category.UpdatedAt = DateTime.UtcNow;

        _categoryRepository.Update(category);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        
        if (category == null)
            throw new NotFoundException("Kategori bulunamadı.");

        _categoryRepository.Delete(category);
        await _unitOfWork.SaveChangesAsync();
    }
}