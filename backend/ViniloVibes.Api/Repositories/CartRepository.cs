using Microsoft.EntityFrameworkCore;
using ViniloVibes.Api.Data;
using ViniloVibes.Api.Models;
using ViniloVibes.Api.Repositories.Interfaces;

namespace ViniloVibes.Api.Repositories;

public class CartRepository : ICartRepository
{
    private readonly AppDbContext _context;

    public CartRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CartItem>> GetByUserAsync(string userId)
    {
        return await _context.CartItems
            .Include(c => c.Vinyl)
            .Where(c => c.UserId == userId)
            .ToListAsync();
    }

    public async Task<CartItem?> GetItemAsync(string userId, int vinylId)
    {
        return await _context.CartItems
            .FirstOrDefaultAsync(c => c.UserId == userId && c.VinylId == vinylId);
    }

    public async Task<CartItem> AddAsync(CartItem item)
    {
        var existing = await GetItemAsync(item.UserId, item.VinylId);
        if (existing is not null)
        {
            existing.Quantity += item.Quantity;
            await _context.SaveChangesAsync();
            return existing;
        }

        _context.CartItems.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task<CartItem?> UpdateQuantityAsync(string userId, int vinylId, int quantity)
    {
        var item = await GetItemAsync(userId, vinylId);
        if (item is null) return null;

        item.Quantity = quantity;
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task<bool> RemoveAsync(string userId, int vinylId)
    {
        var item = await GetItemAsync(userId, vinylId);
        if (item is null) return false;

        _context.CartItems.Remove(item);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task ClearAsync(string userId)
    {
        var items = await _context.CartItems
            .Where(c => c.UserId == userId)
            .ToListAsync();

        _context.CartItems.RemoveRange(items);
        await _context.SaveChangesAsync();
    }
}