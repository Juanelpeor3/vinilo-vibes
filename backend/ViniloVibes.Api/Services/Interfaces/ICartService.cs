using ViniloVibes.Api.DTOs.Cart;

namespace ViniloVibes.Api.Services.Interfaces;

public interface ICartService
{
    Task<IEnumerable<CartItemDto>> GetCartAsync(string userId);
    Task<CartItemDto> AddToCartAsync(string userId, AddToCartDto dto);
    Task<CartItemDto?> UpdateQuantityAsync(string userId, int vinylId, UpdateCartItemDto dto);
    Task<bool> RemoveFromCartAsync(string userId, int vinylId);
    Task ClearCartAsync(string userId);
}