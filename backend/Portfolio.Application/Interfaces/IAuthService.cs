using Portfolio.Application.DTOs.Auth;

namespace Portfolio.Application.Interfaces;

public interface IAuthService
{
    Task<TokenResponse> LoginAsync(LoginRequest request);
}