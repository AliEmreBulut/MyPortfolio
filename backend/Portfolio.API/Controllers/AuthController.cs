using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTOs.Auth;
using Portfolio.Application.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")] 
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var tokenResponse = await _authService.LoginAsync(request);
        return Ok(tokenResponse);
    }
}