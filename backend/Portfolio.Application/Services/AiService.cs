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

        // ChatGPT API'sine istek atıyoruz
        var apiKey = _configuration["OpenAI:ApiKey"];
        if (string.IsNullOrEmpty(apiKey)) 
        {
            return "AI asistan şu an yapılandırılmamış, lütfen sistem yöneticisinin OpenAI API Key girmesini bekleyin.";
        }

        string openAiUrl = "https://api.openai.com/v1/chat/completions";
        
        var requestBody = new
        {
            model = "gpt-4o-mini", 
            messages = new[]
            {
                new { role = "system", content = systemContext },
                new { role = "user", content = request.Message }
            },
            temperature = 0.7
        };

        var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
        // OpenAI için Authorization Token ekliyoruz
        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

        var response = await _httpClient.PostAsync(openAiUrl, content);

        if (!response.IsSuccessStatusCode)
        {
            return "Üzgünüm, şu an iletişim merkezime bağlanamıyorum.";
        }

        var responseString = await response.Content.ReadAsStringAsync();
        using var jsonDoc = JsonDocument.Parse(responseString);
        var answer = jsonDoc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        return answer ?? "Üzgünüm, şu an yanıt veremiyorum.";
    }
}
