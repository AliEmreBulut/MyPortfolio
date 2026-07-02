using Portfolio.Application.DTOs.User;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Services;

public class UserService : IUserService
{
    private readonly IGenericRepository<User> _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IGenericRepository<User> userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<UserProfileResponse?> GetProfileAsync()
    {
        var users = await _userRepository.GetAllAsync();
        var mainUser = users.FirstOrDefault(); // Sistemdeki ilk kullanıcıyı alıyoruz çünkü kişisel portfolyo sitesi.
        
        if (mainUser is null) return null;

        // şifre ve salt gibi verileri döndürümyoruz.
        return new UserProfileResponse
        {
            Id = mainUser.Id,
            FullName = mainUser.FullName,
            Title = mainUser.Title,
            AboutText = mainUser.AboutText,
            ProfileImageUrl = mainUser.ProfileImageUrl,
            ResumeUrl = mainUser.ResumeUrl
        };
    }

    public async Task UpdateProfileAsync(UpdateUserProfileRequest request)
    {
        var users = await _userRepository.GetAllAsync();
        var mainUser = users.FirstOrDefault();
        
        if (mainUser is null) throw new Exception("User not found in the system.");

        mainUser.FullName = request.FullName;
        mainUser.Title = request.Title;
        mainUser.AboutText = request.AboutText;
        mainUser.ProfileImageUrl = request.ProfileImageUrl;
        mainUser.ResumeUrl = request.ResumeUrl;
        mainUser.UpdatedAt = DateTime.UtcNow;

        _userRepository.Update(mainUser);
        await _unitOfWork.SaveChangesAsync();
    }
}