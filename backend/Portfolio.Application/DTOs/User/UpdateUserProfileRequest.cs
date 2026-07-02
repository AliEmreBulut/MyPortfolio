namespace Portfolio.Application.DTOs.User;

public class UpdateUserProfileRequest
{
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? AboutText { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? ResumeUrl { get; set; }
}