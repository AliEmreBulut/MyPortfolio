using System;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class Skill : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public string Name { get; set; } = string.Empty;
}
