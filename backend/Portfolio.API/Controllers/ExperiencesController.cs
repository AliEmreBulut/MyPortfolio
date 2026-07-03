using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTOs.Experience;
using Portfolio.Application.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")] // api/experiences
[Authorize]
public class ExperiencesController : ControllerBase
{
    private readonly IExperienceService _experienceService;

    public ExperiencesController(IExperienceService experienceService)
    {
        _experienceService = experienceService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll() => Ok(await _experienceService.GetAllExperiencesAsync());

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid id)
    {
        var exp = await _experienceService.GetExperienceByIdAsync(id);
        return exp is not null ? Ok(exp) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateExperienceRequest request)
    {
        var created = await _experienceService.CreateExperienceAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateExperienceRequest request)
    {
        try { await _experienceService.UpdateExperienceAsync(id, request); return NoContent(); }
        catch (Exception ex) { return BadRequest(ex.Message); }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try { await _experienceService.DeleteExperienceAsync(id); return NoContent(); }
        catch (Exception ex) { return BadRequest(ex.Message); }
    }
}