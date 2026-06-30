using System;
using System.Collections.Generic;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class Category : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public string Name { get; set; } = string.Empty;

    // Navigation Property
    public ICollection<ProjectCategory> ProjectCategories { get; set; } = new List<ProjectCategory>();
}
