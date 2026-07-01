using System;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class ProjectCategory : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public Guid ProjectId { get; set; }
    public Guid CategoryId { get; set; }
    
    public Project Project { get; set; } = null!;
    public Category Category { get; set; } = null!;
}
