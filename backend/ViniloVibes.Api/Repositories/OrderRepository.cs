using Microsoft.EntityFrameworkCore;
using ViniloVibes.Api.Data;
using ViniloVibes.Api.Models;
using ViniloVibes.Api.Repositories.Interfaces;

namespace ViniloVibes.Api.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;

    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Order> CreateAsync(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<IEnumerable<Order>> GetByUserAsync(string userId)
    {
        return await _context.Orders
            .Include(o => o.Items)
                .ThenInclude(i => i.Vinyl)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
    }

    public async Task<Order?> GetByIdAsync(int id, string userId)
    {
        return await _context.Orders
            .Include(o => o.Items)
                .ThenInclude(i => i.Vinyl)
            .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);
    }
}