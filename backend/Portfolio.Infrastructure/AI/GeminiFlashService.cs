using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Portfolio.Application.Interfaces;

namespace Portfolio.Infrastructure.AI;

public class GeminiFlashService : IAIService
{
    private readonly HttpClient _httpClient;

    public GeminiFlashService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GenerateTextAsync(string prompt, CancellationToken cancellationToken = default)
    {
        // TODO: Implement the actual HTTP POST request to the Gemini 1.5 Flash API endpoint
        // Example: 
        // var response = await _httpClient.PostAsJsonAsync("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=API_KEY", new { ... }, cancellationToken);
        
        return await Task.FromResult($"[Gemini 1.5 Flash Stub] Processed prompt: {prompt}");
    }
}
