using ViniloVibes.Api.DTOs.Vinyls;

namespace ViniloVibes.Api.Services.Interfaces;

public interface IVinylService
{
    Task<IEnumerable<VinylDto>> GetAllAsync();
    Task<VinylDto?> GetByIdAsync(int id);
    Task<IEnumerable<VinylDto>> GetByGenreAsync(int genreId);
    Task<VinylDto> CreateAsync(CreateVinylDto dto);
    Task<VinylDto?> UpdateAsync(int id, UpdateVinylDto dto);
    Task<bool> DeleteAsync(int id);
    Task<bool> UpdateStockAsync(int id, int quantity);
}