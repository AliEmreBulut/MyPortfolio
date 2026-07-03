using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTOs.Ai;
using Portfolio.Application.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AiController : ControllerBase
{
    private readonly IAiService _aiService;

    public AiController(IAiService aiService)
    {
        _aiService = aiService;
    }

    [HttpPost("chat")]
    [AllowAnonymous]
    public async Task<IActionResult> Chat([FromBody] AiChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
            return BadRequest("Lütfen bir soru sorun.");

        var response = await _aiService.AskQuestionAsync(request);
        return Ok(new { answer = response });
    }
}
