using System;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class Project : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public string Title { get; set; } = string.Empty;
}
