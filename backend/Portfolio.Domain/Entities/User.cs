using System;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class User : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public string Email { get; set; } = string.Empty;
}
