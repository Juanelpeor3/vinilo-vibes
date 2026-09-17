using ViniloVibes.Api.Models;

namespace ViniloVibes.Api.Repositories.Interfaces;

public interface IVinylRepository
{
    Task<IEnumerable<Vinyl>> GetAllAsync();
    Task<Vinyl?> GetByIdAsync(int id);
    Task<IEnumerable<Vinyl>> GetByGenreAsync(int genreId);
    Task<Vinyl> CreateAsync(Vinyl vinyl);
    Task<Vinyl?> UpdateAsync(int id, Vinyl vinyl);
    Task<bool> DeleteAsync(int id);
    Task<bool> UpdateStockAsync(int id, int quantity);
}