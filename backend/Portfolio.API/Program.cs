using FluentValidation.AspNetCore;
using Portfolio.API.Middlewares;
using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Portfolio.Infrastructure.Data.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Application;
using Portfolio.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// DI Kayıtları
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;
builder.Services.AddInfrastructure(connectionString);
builder.Services.AddApplication();
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddOpenApi();
builder.Services.AddHttpContextAccessor();

// JWT Authentication Yapılandırması
var secretKey = builder.Configuration.GetSection("Jwt:Secret").Value;
if (string.IsNullOrEmpty(secretKey)) throw new Exception("JWT Secret Key bulunamadı!");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });
builder.Services.AddAuthorization();

// CORS — Sadece kendi frontend'imizden gelen isteklere izin ver
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins(
            "http://localhost:3000",
            "https://localhost:3000"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

// Rate Limiting — AI endpoint'ini kötüye kullanıma karşı koru
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("ai", opt =>
    {
        opt.PermitLimit = 5;                           // 5 istek
        opt.Window = TimeSpan.FromMinutes(1);           // dakikada
        opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        opt.QueueLimit = 0;                             // kuyruk yok, direkt reddet
    });
    options.AddFixedWindowLimiter("login", opt =>
    {
        opt.PermitLimit = 5;                            // 5 deneme
        opt.Window = TimeSpan.FromMinutes(5);            // 5 dakikada
        opt.QueueLimit = 0;
    });
});

var webRoot = builder.Environment.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
if (!Directory.Exists(webRoot)) Directory.CreateDirectory(webRoot);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Portfolio API v1");
        options.RoutePrefix = "swagger";
    });
}

app.UseCors("AllowFrontend");

app.UseStaticFiles(); // wwwroot içindeki resimlerin dışarıdan erişilebilir olmasını sağlar

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();
app.UseRateLimiter();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();

        await context.Database.MigrateAsync(); 
        
        // Başlangıç verilerini seedler
        await ApplicationDbContextSeed.SeedAsync(context);
    }
    catch (Exception ex)
    {
        // Başlangıçta bir hata olursa konsola yazdır
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Veritabanı migration veya seed işlemi sırasında bir hata oluştu.");
    }
}
app.Run();
