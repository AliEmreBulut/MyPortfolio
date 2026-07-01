using System.Threading;
using System.Threading.Tasks;

namespace Portfolio.Application.Interfaces;

public interface IAIService
{
    Task<string> GenerateTextAsync(string prompt, CancellationToken cancellationToken = default);
}
    