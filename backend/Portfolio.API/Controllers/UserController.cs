using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTOs.User;
using Portfolio.Application.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")] // api/user
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    // Profil tekil olduğu için id almamıza gerek yok
    [HttpGet("profile")]
    [AllowAnonymous]
    public async Task<IActionResult> GetProfile()
    {
        var profile = await _userService.GetProfileAsync();
        return profile is not null ? Ok(profile) : NotFound();
    }

    [HttpPut("profile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserProfileRequest request)
    {
        try
        {
            await _userService.UpdateProfileAsync(request);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}