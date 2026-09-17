using ViniloVibes.Api.Models;

namespace ViniloVibes.Api.Repositories.Interfaces;

public interface IOrderRepository
{
    Task<Order> CreateAsync(Order order);
    Task<IEnumerable<Order>> GetByUserAsync(string userId);
    Task<Order?> GetByIdAsync(int id, string userId);
}