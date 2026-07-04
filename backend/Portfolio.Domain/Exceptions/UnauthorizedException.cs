using System.Net;

namespace Portfolio.Domain.Exceptions;

public class UnauthorizedException : ApiException
{
    public UnauthorizedException(string message) : base(message, HttpStatusCode.Unauthorized)
    {
    }
}
