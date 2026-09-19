using ViniloVibes.Api.DTOs.Orders;

namespace ViniloVibes.Api.Services.Interfaces;

public interface IOrderService
{
    Task<OrderDto> CheckoutAsync(string userId);
    Task<IEnumerable<OrderSummaryDto>> GetOrdersAsync(string userId);
    Task<OrderDto?> GetOrderByIdAsync(int id, string userId);
}