using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Data.Contexts;

public static class ApplicationDbContextSeed
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Eğer veritabanında hiç kullanıcı yoksa ilk admini oluştur
        if (!await context.Users.AnyAsync())
        {
            using var hmac = new HMACSHA512();
            
            var adminUser = new User
            {
                Id = Guid.NewGuid(),
                FullName = "Ali Emre Bulut",
                Title = "Software Developer",
                Username = "Admin", 
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Admin123!")),
                PasswordSalt = hmac.Key,
                CreatedAt = DateTime.UtcNow,
                Status = true
            };

            await context.Users.AddAsync(adminUser);
            await context.SaveChangesAsync();
        }
    }
}