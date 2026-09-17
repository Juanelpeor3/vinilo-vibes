using Microsoft.EntityFrameworkCore;
using ViniloVibes.Api.Data;
using ViniloVibes.Api.Models;
using ViniloVibes.Api.Repositories.Interfaces;

namespace ViniloVibes.Api.Repositories;

public class VinylRepository : IVinylRepository
{
    private readonly AppDbContext _context;

    public VinylRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Vinyl>> GetAllAsync()
    {
        return await _context.Vinyls
            .Include(v => v.Genre)
            .Include(v => v.Ratings)
            .ToListAsync();
    }

    public async Task<Vinyl?> GetByIdAsync(int id)
    {
        return await _context.Vinyls
            .Include(v => v.Genre)
            .Include(v => v.Ratings)
            .FirstOrDefaultAsync(v => v.Id == id);
    }

    public async Task<IEnumerable<Vinyl>> GetByGenreAsync(int genreId)
    {
        return await _context.Vinyls
            .Include(v => v.Genre)
            .Include(v => v.Ratings)
            .Where(v => v.GenreId == genreId)
            .ToListAsync();
    }

    public async Task<Vinyl> CreateAsync(Vinyl vinyl)
    {
        _context.Vinyls.Add(vinyl);
        await _context.SaveChangesAsync();

        return await _context.Vinyls
            .Include(v => v.Genre)
            .Include(v => v.Ratings)
            .FirstAsync(v => v.Id == vinyl.Id);
    }

    public async Task<Vinyl?> UpdateAsync(int id, Vinyl vinyl)
    {
        var existing = await _context.Vinyls.FindAsync(id);
        if (existing is null) return null;

        existing.Title = vinyl.Title;
        existing.Artist = vinyl.Artist;
        existing.ImageUrl = vinyl.ImageUrl;
        existing.Description = vinyl.Description;
        existing.Price = vinyl.Price;
        existing.Stock = vinyl.Stock;
        existing.ReleaseYear = vinyl.ReleaseYear;
        existing.GenreId = vinyl.GenreId;

        await _context.SaveChangesAsync();

        return await _context.Vinyls
            .Include(v => v.Genre)
            .Include(v => v.Ratings)
            .FirstAsync(v => v.Id == id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var vinyl = await _context.Vinyls.FindAsync(id);
        if (vinyl is null) return false;

        _context.Vinyls.Remove(vinyl);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateStockAsync(int id, int quantity)
    {
        var vinyl = await _context.Vinyls.FindAsync(id);
        if (vinyl is null || vinyl.Stock < quantity) return false;

        vinyl.Stock -= quantity;
        await _context.SaveChangesAsync();
        return true;
    }
}