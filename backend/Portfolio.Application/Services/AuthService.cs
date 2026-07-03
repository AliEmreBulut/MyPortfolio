using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Application.DTOs.Auth;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Services;

public class AuthService : IAuthService
{
    private readonly IGenericRepository<User> _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IGenericRepository<User> userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<TokenResponse> LoginAsync(LoginRequest request)
    {
        var users = await _userRepository.FindAsync(u => u.Username == request.Username);
        var user = users.FirstOrDefault();

        // Kullanıcı yoksa veya şifre yanlışsa hata döndür. User'daki PasswordHash string olarak Base64 tutulur.
        if (user == null || string.IsNullOrEmpty(user.PasswordHash) || string.IsNullOrEmpty(user.Salt) ||
            !VerifyPasswordHash(request.Password, Convert.FromBase64String(user.PasswordHash), Convert.FromBase64String(user.Salt)))
        {
            throw new Exception("Geçersiz kullanıcı adı veya şifre.");
        }

        // şifre doğruysa token üret ve dön
        var token = CreateToken(user);

        return new TokenResponse
        {
            Token = token,
            Expiration = DateTime.UtcNow.AddDays(7) // 7 günlük ömür
        };
    }

    // Gelen düz metin şifreyi, veritabanındaki Tuz (Salt) ile karıştırıp, Hash'in eşleşip eşleşmediğine bakar.
    private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
        using var hmac = new HMACSHA512(storedSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(storedHash);
    }

    // JWT üretimi
    private string CreateToken(User user)
    {
        // Token içine gömeceğimiz açık bilgiler 
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        // User Secrets'tan şifreyi okuyoruz
        var secretKey = _configuration.GetSection("Jwt:Secret").Value;
        if (string.IsNullOrEmpty(secretKey)) throw new Exception("JWT Secret Key bulunamadı!");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        
        // şifreyi HMACSHA512 ile imzalıyoruz
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7), // 7 Gün
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}