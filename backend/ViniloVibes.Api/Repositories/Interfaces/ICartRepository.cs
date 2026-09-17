using ViniloVibes.Api.Models;

namespace ViniloVibes.Api.Repositories.Interfaces;

public interface ICartRepository
{
    Task<IEnumerable<CartItem>> GetByUserAsync(string userId);
    Task<CartItem?> GetItemAsync(string userId, int vinylId);
    Task<CartItem> AddAsync(CartItem item);
    Task<CartItem?> UpdateQuantityAsync(string userId, int vinylId, int quantity);
    Task<bool> RemoveAsync(string userId, int vinylId);
    Task ClearAsync(string userId);
}