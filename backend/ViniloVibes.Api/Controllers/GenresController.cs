using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViniloVibes.Api.Data;

namespace ViniloVibes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GenresController : ControllerBase
{
    private readonly AppDbContext _context;

    public GenresController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var genres = await _context.Genres
            .Select(g => new { g.Id, g.Name })
            .ToListAsync();
        return Ok(genres);
    }
}