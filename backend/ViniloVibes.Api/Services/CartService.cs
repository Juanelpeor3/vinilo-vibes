using ViniloVibes.Api.DTOs.Cart;
using ViniloVibes.Api.Models;
using ViniloVibes.Api.Repositories.Interfaces;
using ViniloVibes.Api.Services.Interfaces;

namespace ViniloVibes.Api.Services;

public class CartService : ICartService
{
    private readonly ICartRepository _repository;

    public CartService(ICartRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<CartItemDto>> GetCartAsync(string userId)
    {
        var items = await _repository.GetByUserAsync(userId);
        return items.Select(MapToDto);
    }

    public async Task<CartItemDto> AddToCartAsync(string userId, AddToCartDto dto)
    {
        var item = new CartItem
        {
            UserId = userId,
            VinylId = dto.VinylId,
            Quantity = dto.Quantity
        };

        var created = await _repository.AddAsync(item);

        var items = await _repository.GetByUserAsync(userId);
        var withVinyl = items.First(i => i.VinylId == dto.VinylId);
        return MapToDto(withVinyl);
    }

    public async Task<CartItemDto?> UpdateQuantityAsync(string userId, int vinylId, UpdateCartItemDto dto)
    {
        var updated = await _repository.UpdateQuantityAsync(userId, vinylId, dto.Quantity);
        if (updated is null) return null;

        var items = await _repository.GetByUserAsync(userId);
        var withVinyl = items.First(i => i.VinylId == vinylId);
        return MapToDto(withVinyl);
    }

    public async Task<bool> RemoveFromCartAsync(string userId, int vinylId)
    {
        return await _repository.RemoveAsync(userId, vinylId);
    }

    public async Task ClearCartAsync(string userId)
    {
        await _repository.ClearAsync(userId);
    }

    private static CartItemDto MapToDto(CartItem item)
    {
        return new CartItemDto
        {
            Id = item.Id,
            VinylId = item.VinylId,
            VinylTitle = item.Vinyl?.Title ?? string.Empty,
            VinylArtist = item.Vinyl?.Artist ?? string.Empty,
            VinylImageUrl = item.Vinyl?.ImageUrl,
            VinylPrice = item.Vinyl?.Price ?? 0,
            Quantity = item.Quantity
        };
    }
}