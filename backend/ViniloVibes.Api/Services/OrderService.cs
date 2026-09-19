using ViniloVibes.Api.DTOs.Orders;
using ViniloVibes.Api.Models;
using ViniloVibes.Api.Repositories.Interfaces;
using ViniloVibes.Api.Services.Interfaces;

namespace ViniloVibes.Api.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly ICartRepository _cartRepository;
    private readonly IVinylRepository _vinylRepository;

    public OrderService(
        IOrderRepository orderRepository,
        ICartRepository cartRepository,
        IVinylRepository vinylRepository)
    {
        _orderRepository = orderRepository;
        _cartRepository = cartRepository;
        _vinylRepository = vinylRepository;
    }

    public async Task<OrderDto> CheckoutAsync(string userId)
    {
        var cartItems = (await _cartRepository.GetByUserAsync(userId)).ToList();
        if (cartItems.Count == 0)
            throw new InvalidOperationException("Cart is empty");

        // Verify stock and build order items
        var orderItems = new List<OrderItem>();
        foreach (var cartItem in cartItems)
        {
            var vinyl = await _vinylRepository.GetByIdAsync(cartItem.VinylId)
                ?? throw new InvalidOperationException($"Vinyl {cartItem.VinylId} not found");

            if (vinyl.Stock < cartItem.Quantity)
                throw new InvalidOperationException($"Insufficient stock for '{vinyl.Title}'");

            orderItems.Add(new OrderItem
            {
                VinylId = cartItem.VinylId,
                Quantity = cartItem.Quantity,
                UnitPrice = vinyl.Price
            });
        }

        // Decrement stock
        foreach (var item in orderItems)
        {
            await _vinylRepository.UpdateStockAsync(item.VinylId, item.Quantity);
        }

        // Create order
        var order = new Order
        {
            UserId = userId,
            Total = orderItems.Sum(i => i.UnitPrice * i.Quantity),
            Items = orderItems,
            Status = "Confirmed"
        };

        var created = await _orderRepository.CreateAsync(order);

        // Clear cart
        await _cartRepository.ClearAsync(userId);

        return MapToDto(created);
    }

    public async Task<IEnumerable<OrderSummaryDto>> GetOrdersAsync(string userId)
    {
        var orders = await _orderRepository.GetByUserAsync(userId);
        return orders.Select(o => new OrderSummaryDto
        {
            Id = o.Id,
            Total = o.Total,
            CreatedAt = o.CreatedAt,
            Status = o.Status,
            ItemCount = o.Items.Count
        });
    }

    public async Task<OrderDto?> GetOrderByIdAsync(int id, string userId)
    {
        var order = await _orderRepository.GetByIdAsync(id, userId);
        return order is null ? null : MapToDto(order);
    }

    private static OrderDto MapToDto(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            Total = order.Total,
            CreatedAt = order.CreatedAt,
            Status = order.Status,
            Items = order.Items.Select(i => new OrderItemDto
            {
                Id = i.Id,
                VinylId = i.VinylId,
                VinylTitle = i.Vinyl?.Title ?? string.Empty,
                VinylArtist = i.Vinyl?.Artist ?? string.Empty,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice
            }).ToList()
        };
    }
}