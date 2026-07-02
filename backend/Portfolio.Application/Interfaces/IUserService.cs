using Portfolio.Application.DTOs.User;

namespace Portfolio.Application.Interfaces;

public interface IUserService
{
    Task<UserProfileResponse?> GetProfileAsync();
    Task UpdateProfileAsync(UpdateUserProfileRequest request);
}
