namespace Portfolio.Application.DTOs.User;

public class UserProfileResponse
{
    //Burada şifre asla döndürülmez güvenlik açısından.
    
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? AboutText { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? ResumeUrl { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? GitHubUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? TwitterUrl { get; set; }
    public string? InstagramUrl { get; set; }
}