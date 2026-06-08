using System.Security.Claims;
using Backend.Data;
using Backend.DTOs.Task;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TasksController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var tasks = await _context.Tasks
            .Where(x => x.CreatedBy == userId)
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var userId = int.Parse(
    User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var task = await _context.Tasks
            .FirstOrDefaultAsync(x =>
                x.Id == id &&
                x.CreatedBy == userId);

        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateTaskRequest request)
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var task = new TaskItem
        {
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            DueDate = request.DueDate,
            Status = string.IsNullOrWhiteSpace(request.Status) ? "Pending" : request.Status,
            CreatedBy = userId
        };

        _context.Tasks.Add(task);

        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateTaskRequest request)
    {
        var userId = int.Parse(
    User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var task = await _context.Tasks
            .FirstOrDefaultAsync(x =>
                x.Id == id &&
                x.CreatedBy == userId);

        if (task == null)
        {
            return NotFound();
        }

        task.Title = request.Title;
        task.Description = request.Description;
        task.Status = request.Status;
        task.Priority = request.Priority;
        task.DueDate = request.DueDate;

        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = int.Parse(
    User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var task = await _context.Tasks
            .FirstOrDefaultAsync(x =>
                x.Id == id &&
                x.CreatedBy == userId);

        if (task == null)
        {
            return NotFound();
        }

        _context.Tasks.Remove(task);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}