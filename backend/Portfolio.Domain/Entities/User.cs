using System;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class User : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // Güvenlik Alanları
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Salt { get; set; } = string.Empty;

    // Profil Alanları
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string AboutText { get; set; } = string.Empty;
    public string ProfileImageUrl { get; set; } = string.Empty;
    public string ResumeUrl { get; set; } = string.Empty;
}
