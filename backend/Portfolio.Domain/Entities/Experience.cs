using System;
using Portfolio.Domain.Enums;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class Experience : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Location { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; } // null ise hâlâ devam ediyor

    public ExperienceType Type { get; set; } = ExperienceType.Job;

    public int DisplayOrder { get; set; }

    // Navigation Property
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
}
