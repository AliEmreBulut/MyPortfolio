using System;
using System.Collections.Generic;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class User : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // Güvenlik kısmı giriş için önemli!!
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Salt { get; set; } = string.Empty;

    // Profil bilgileri
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? AboutText { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? ResumeUrl { get; set; }

    // Bir kullanıcının birden fazla deneyimi olabilir
    public ICollection<Experience> Experiences { get; set; } = new List<Experience>();
}
