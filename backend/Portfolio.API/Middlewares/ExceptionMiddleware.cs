using System.Net;
using System.Text.Json;
using Portfolio.Domain.Exceptions;

namespace Portfolio.API.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    // Dependency Injection ile gerekli araçları alıyoruz
    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            // Hatayı arka planda Logla
            _logger.LogError(ex, "Sistemde beklenmeyen bir hata yakalandı!");

            // Dış dünyaya gönderilecek yanıtın ayarlarını yap
            context.Response.ContentType = "application/json";
            
            var statusCode = HttpStatusCode.InternalServerError;
            if (ex is ApiException apiEx)
            {
                statusCode = apiEx.StatusCode;
            }

            context.Response.StatusCode = (int)statusCode;

            // Geliştirme modundaysan hatanın tüm detayını (StackTrace) dön.
            // Canlı moddaysan ve bizim fırlattığımız özel API hatasıysa mesajı olduğu gibi göster, aksi halde genel bir mesaj dön.
            object response = _env.IsDevelopment()
                ? new { StatusCode = context.Response.StatusCode, Message = ex.Message, Details = ex.StackTrace?.ToString() }
                : new { 
                    StatusCode = context.Response.StatusCode, 
                    Message = ex is ApiException 
                        ? ex.Message 
                        : "Sunucu tarafında beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin." 
                };

            // JSON formatına çevir ve gönder
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}