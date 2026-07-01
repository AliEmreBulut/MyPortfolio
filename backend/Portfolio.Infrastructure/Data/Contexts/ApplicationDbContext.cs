using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;
using System.Reflection;

namespace Portfolio.Infrastructure.Data.Contexts;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Skill> Skills { get; set; } = null!;
    public DbSet<Experience> Experiences { get; set; } = null!;
    public DbSet<ProjectSkill> ProjectSkills { get; set; } = null!;
    public DbSet<ProjectCategory> ProjectCategories { get; set; } = null!;
    public DbSet<PromptLog> PromptLogs { get; set; } = null!;
}