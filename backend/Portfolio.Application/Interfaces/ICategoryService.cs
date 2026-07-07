using Portfolio.Application.DTOs.Category;

namespace Portfolio.Application.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryResponse>> GetAllAsync();
    Task<CategoryResponse?> GetByIdAsync(Guid id);
    Task<CategoryResponse> CreateAsync(CreateCategoryRequest request);
    Task UpdateAsync(UpdateCategoryRequest request);
    Task DeleteAsync(Guid id);
}