using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;
using System.Reflection;

namespace Portfolio.Infrastructure.Data.Contexts;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    //Tablo tanımlamaları
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Skill> Skills { get; set; } = null!;
    public DbSet<Experience> Experiences { get; set; } = null!;
    public DbSet<ProjectSkill> ProjectSkills { get; set; } = null!;
    public DbSet<ProjectCategory> ProjectCategories { get; set; } = null!;
    public DbSet<PromptLog> PromptLogs { get; set; } = null!;
    public DbSet<ProjectImage> ProjectImages { get; set; } = null!;

    // ekleme ve güncelleme anında CreatedAt ve UpdatedAt alanlarını otomatik doldurmak için.
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker.Entries<IEntity>();
        foreach (var entry in entries)
        {
            if(entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.UtcNow;   
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
        }
        return base.SaveChangesAsync(cancellationToken);   
    }


    // Tabloların Db tarafında nasıl oluşturulacağını söylemek için.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        base.OnModelCreating(modelBuilder);
        
        //apply configurations from assembly kuralların yazılı olduğu dosyaları bulur ve onları uygular. Get executing assemblyde şu an çalışan projeyi getirir.
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}