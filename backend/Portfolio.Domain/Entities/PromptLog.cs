using System;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Domain.Entities;

public class PromptLog : IEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    public string Prompt { get; set; } = string.Empty;
}
