using System.Net;

namespace Portfolio.Domain.Exceptions;

public class NotFoundException : ApiException
{
    public NotFoundException(string message) : base(message, HttpStatusCode.NotFound)
    {
    }
}
