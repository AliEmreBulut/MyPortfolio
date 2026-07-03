using System;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class ProjectImage : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public Guid ProjectId { get; set; } 
    public string ImageUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    
    // project tablosuna bağlamak için navigation property
    public Project Project { get; set; } = null!;
}