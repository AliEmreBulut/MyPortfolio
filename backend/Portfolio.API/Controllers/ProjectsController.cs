using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTOs.Project;
using Portfolio.Application.Interfaces;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var projects = await _projectService.GetAllProjectsAsync();
        return Ok(projects); // 200 OK
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        if (project is null) return NotFound(); // 404 Not Found

        return Ok(project);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProjectRequest request)
    {
        var createdProject = await _projectService.CreateProjectAsync(request);
        // 201 Created döner ve yeni kaynağın nerede bulunacağını belirtir
        return CreatedAtAction(nameof(GetById), new { id = createdProject.Id }, createdProject);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProjectRequest request)
    {
        await _projectService.UpdateProjectAsync(id, request);
        return NoContent(); // 204 No Content
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _projectService.DeleteProjectAsync(id);
        return NoContent();
    }
}