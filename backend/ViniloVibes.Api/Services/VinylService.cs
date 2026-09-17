using ViniloVibes.Api.DTOs.Vinyls;
using ViniloVibes.Api.Models;
using ViniloVibes.Api.Repositories.Interfaces;
using ViniloVibes.Api.Services.Interfaces;

namespace ViniloVibes.Api.Services;

public class VinylService : IVinylService
{
    private readonly IVinylRepository _repository;

    public VinylService(IVinylRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<VinylDto>> GetAllAsync()
    {
        var vinyls = await _repository.GetAllAsync();
        return vinyls.Select(MapToDto);
    }

    public async Task<VinylDto?> GetByIdAsync(int id)
    {
        var vinyl = await _repository.GetByIdAsync(id);
        return vinyl is null ? null : MapToDto(vinyl);
    }

    public async Task<IEnumerable<VinylDto>> GetByGenreAsync(int genreId)
    {
        var vinyls = await _repository.GetByGenreAsync(genreId);
        return vinyls.Select(MapToDto);
    }

    public async Task<VinylDto> CreateAsync(CreateVinylDto dto)
    {
        var vinyl = new Vinyl
        {
            Title = dto.Title,
            Artist = dto.Artist,
            ImageUrl = dto.ImageUrl,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock,
            ReleaseYear = dto.ReleaseYear,
            GenreId = dto.GenreId
        };

        var created = await _repository.CreateAsync(vinyl);
        return MapToDto(created);
    }

    public async Task<VinylDto?> UpdateAsync(int id, UpdateVinylDto dto)
    {
        var vinyl = new Vinyl
        {
            Title = dto.Title,
            Artist = dto.Artist,
            ImageUrl = dto.ImageUrl,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock,
            ReleaseYear = dto.ReleaseYear,
            GenreId = dto.GenreId
        };

        var updated = await _repository.UpdateAsync(id, vinyl);
        return updated is null ? null : MapToDto(updated);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }

    public async Task<bool> UpdateStockAsync(int id, int quantity)
    {
        return await _repository.UpdateStockAsync(id, quantity);
    }

    private static VinylDto MapToDto(Vinyl vinyl)
    {
        return new VinylDto
        {
            Id = vinyl.Id,
            Title = vinyl.Title,
            Artist = vinyl.Artist,
            ImageUrl = vinyl.ImageUrl,
            Description = vinyl.Description,
            Price = vinyl.Price,
            Stock = vinyl.Stock,
            ReleaseYear = vinyl.ReleaseYear,
            GenreId = vinyl.GenreId,
            GenreName = vinyl.Genre?.Name ?? string.Empty
        };
    }
}