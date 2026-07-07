using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Portfolio.Application.DTOs.Ai;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Services;

public class AiService : IAiService
{
    private readonly IConfiguration _configuration;
    private readonly IGenericRepository<PromptLog> _promptLogRepository;
    private readonly IUserService _userService;
    private readonly IProjectService _projectService;
    private readonly HttpClient _httpClient;
    private readonly IUnitOfWork _unitOfWork;

    public AiService(
        IConfiguration configuration, 
        IGenericRepository<PromptLog> promptLogRepository,
        IUserService userService,
        IProjectService projectService,
        IUnitOfWork unitOfWork)
    {
        _configuration = configuration;
        _promptLogRepository = promptLogRepository;
        _userService = userService;
        _projectService = projectService;
        _httpClient = new HttpClient();
        _unitOfWork = unitOfWork;
    }

    public async Task<string> AskQuestionAsync(AiChatRequest request)
    {
        // Kullanıcının sorduğu soruyu veritabanına loguyoruz
        var log = new PromptLog
        {
            Id = Guid.NewGuid(),
            Prompt = request.Message,
            CreatedAt = DateTime.UtcNow
        };
        await _promptLogRepository.AddAsync(log);
        await _unitOfWork.SaveChangesAsync();

        // Kişisel verileri verilerini topla
        var profile = await _userService.GetProfileAsync();
        var projects = await _projectService.GetAllProjectsAsync();

        string systemContext = $"Sen, {profile?.FullName ?? "bir yazılımcı"} için asistanlık yapan bir AI modelisin. Ziyaretçiler onun portfolyosunda sana sorular soruyor. " +
            $"Gelen soruya kullanıcının portfolyosundaki şu verilere dayanarak cevap ver: " +
            $"Yazılımcı Hakkında: {profile?.AboutText}. " +
            $"Projeleri: {string.Join(", ", projects.Select(p => p.Title + " - " + p.ShortSummary))}. " +
            $"Sosyal Medyaları: GitHub({profile?.GitHubUrl}), LinkedIn({profile?.LinkedInUrl}). " +
            $"Soru: {request.Message}. Cevabın kısa, samimi, yardımsever ve sadece bu yazılımcı ile ilgili olsun.";

        // Gemini API'sine istek atıyoruz
        var apiKey = _configuration["Gemini:ApiKey"];
        if (string.IsNullOrEmpty(apiKey)) 
        {
            return "AI asistan şu an yapılandırılmamış, lütfen sistem yöneticisinin Gemini API Key girmesini bekleyin.";
        }

        string geminiUrl = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={apiKey}";
        
        var requestBody = new
        {
            contents = new[]
            {
                new 
                { 
                    parts = new[] 
                    { 
                        new { text = systemContext + "\n\n" + request.Message } 
                    } 
                }
            }
        };

        var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
        _httpClient.DefaultRequestHeaders.Clear();

        var response = await _httpClient.PostAsync(geminiUrl, content);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"[Gemini Error] {response.StatusCode}: {errorContent}");
            return "Üzgünüm, şu an iletişim merkezime bağlanamıyorum.";
        }

        var responseString = await response.Content.ReadAsStringAsync();
        using var jsonDoc = JsonDocument.Parse(responseString);
        
        try 
        {
            var answer = jsonDoc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            return answer ?? "Üzgünüm, şu an yanıt veremiyorum.";
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Gemini Parse Error] {ex.Message}");
            return "Üzgünüm, şu an yanıt veremiyorum.";
        }
    }
}
