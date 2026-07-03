using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTOs.Skill;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Enums;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")] // api/skills
[Authorize]
public class SkillsController : ControllerBase
{
    private readonly ISkillService _skillService;

    public SkillsController(ISkillService skillService)
    {
        _skillService = skillService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _skillService.GetAllSkillsAsync());
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid id)
    {
        var skill = await _skillService.GetSkillByIdAsync(id);
        return skill is not null ? Ok(skill) : NotFound();
    }

    //Kategoriye göre getirme
    [HttpGet("category/{category}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetByCategory(SkillCategory category)
    {
        var skills = await _skillService.GetSkillsByCategoryAsync(category);
        return Ok(skills);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSkillRequest request)
    {
        var created = await _skillService.CreateSkillAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSkillRequest request)
    {
        try
        {
            await _skillService.UpdateSkillAsync(id, request);
            return NoContent();
        }
        catch (Exception ex) { return BadRequest(ex.Message); }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _skillService.DeleteSkillAsync(id);
            return NoContent();
        }
        catch (Exception ex) { return BadRequest(ex.Message); }
    }
}