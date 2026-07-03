using Portfolio.Application.DTOs.Ai;

namespace Portfolio.Application.Interfaces;

public interface IAiService
{
    Task<string> AskQuestionAsync(AiChatRequest request);
}