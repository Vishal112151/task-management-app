using Backend.Data;
using Backend.DTOs.Auth;
using Backend.Entities;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IJwtService _jwtService;

    public AuthController(
        ApplicationDbContext context,
        IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var userExists = await _context.Users
            .AnyAsync(x => x.Email == request.Email);

        if (userExists)
        {
            return BadRequest("Email already exists");
        }

        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = "User"
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "User registered successfully"
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == request.Email);

        if (user == null)
        {
            return Unauthorized("Invalid email or password");
        }

        var validPassword =
            BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash);

        if (!validPassword)
        {
            return Unauthorized("Invalid email or password");
        }

        var token = _jwtService.GenerateToken(user);

        return Ok(new
        {
            token
        });
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult Profile()
    {
        return Ok(new
        {
            UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
            Name = User.FindFirst(ClaimTypes.Name)?.Value,
            Email = User.FindFirst(ClaimTypes.Email)?.Value,
            Role = User.FindFirst(ClaimTypes.Role)?.Value
        });
    }
}