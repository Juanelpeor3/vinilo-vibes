using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ViniloVibes.Api.DTOs.Vinyls;
using ViniloVibes.Api.Services.Interfaces;

namespace ViniloVibes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VinylsController : ControllerBase
{
    private readonly IVinylService _vinylService;

    public VinylsController(IVinylService vinylService)
    {
        _vinylService = vinylService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<VinylDto>>> GetAll()
    {
        var vinyls = await _vinylService.GetAllAsync();
        return Ok(vinyls);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<VinylDto>> GetById(int id)
    {
        var vinyl = await _vinylService.GetByIdAsync(id);
        if (vinyl is null) return NotFound();
        return Ok(vinyl);
    }

    [HttpGet("genre/{genreId}")]
    public async Task<ActionResult<IEnumerable<VinylDto>>> GetByGenre(int genreId)
    {
        var vinyls = await _vinylService.GetByGenreAsync(genreId);
        return Ok(vinyls);
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<VinylDto>> Create(CreateVinylDto dto)
    {
        var vinyl = await _vinylService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = vinyl.Id }, vinyl);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<VinylDto>> Update(int id, UpdateVinylDto dto)
    {
        var vinyl = await _vinylService.UpdateAsync(id, dto);
        if (vinyl is null) return NotFound();
        return Ok(vinyl);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _vinylService.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }

    [HttpPatch("{id}/stock")]
    [Authorize]
    public async Task<IActionResult> UpdateStock(int id, [FromBody] int quantity)
    {
        var updated = await _vinylService.UpdateStockAsync(id, quantity);
        if (!updated) return BadRequest(new { message = "Insufficient stock or vinyl not found" });
        return NoContent();
    }
}