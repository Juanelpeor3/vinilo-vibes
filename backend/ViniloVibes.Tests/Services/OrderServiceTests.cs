using Moq;
using ViniloVibes.Api.Models;
using ViniloVibes.Api.Repositories.Interfaces;
using ViniloVibes.Api.Services;

namespace ViniloVibes.Tests.Services;

public class OrderServiceTests
{
    private readonly Mock<IOrderRepository> _orderRepoMock;
    private readonly Mock<ICartRepository> _cartRepoMock;
    private readonly Mock<IVinylRepository> _vinylRepoMock;
    private readonly OrderService _service;
    private const string UserId = "user-1";

    public OrderServiceTests()
    {
        _orderRepoMock = new Mock<IOrderRepository>();
        _cartRepoMock = new Mock<ICartRepository>();
        _vinylRepoMock = new Mock<IVinylRepository>();
        _service = new OrderService(_orderRepoMock.Object, _cartRepoMock.Object, _vinylRepoMock.Object);
    }

    private static Vinyl CreateVinyl(int id = 1, int stock = 10) => new()
    {
        Id = id,
        Title = "Abbey Road",
        Artist = "The Beatles",
        Price = 29.99m,
        Stock = stock,
        Genre = new Genre { Id = 1, Name = "Rock" },
        Ratings = []
    };

    // CheckoutAsync

    [Fact]
    public async Task CheckoutAsync_ValidCart_CreatesOrder()
    {
        var vinyl = CreateVinyl();
        var cartItems = new List<CartItem>
        {
            new() { Id = 1, UserId = UserId, VinylId = 1, Quantity = 2, Vinyl = vinyl }
        };

        _cartRepoMock.Setup(r => r.GetByUserAsync(UserId)).ReturnsAsync(cartItems);
        _vinylRepoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(vinyl);
        _vinylRepoMock.Setup(r => r.UpdateStockAsync(1, 2)).ReturnsAsync(true);
        _orderRepoMock.Setup(r => r.CreateAsync(It.IsAny<Order>()))
            .ReturnsAsync((Order o) => { o.Id = 1; return o; });
        _cartRepoMock.Setup(r => r.ClearAsync(UserId)).Returns(Task.CompletedTask);

        var result = await _service.CheckoutAsync(UserId);

        Assert.Equal(59.98m, result.Total);
        Assert.Equal("Confirmed", result.Status);
        Assert.Single(result.Items);
        _cartRepoMock.Verify(r => r.ClearAsync(UserId), Times.Once);
    }

    [Fact]
    public async Task CheckoutAsync_EmptyCart_ThrowsInvalidOperation()
    {
        _cartRepoMock.Setup(r => r.GetByUserAsync(UserId)).ReturnsAsync(new List<CartItem>());

        var ex = await Assert.ThrowsAsync<InvalidOperationException>(
            () => _service.CheckoutAsync(UserId));
        Assert.Equal("Cart is empty", ex.Message);
    }

    [Fact]
    public async Task CheckoutAsync_InsufficientStock_ThrowsInvalidOperation()
    {
        var vinyl = CreateVinyl(stock: 1);
        var cartItems = new List<CartItem>
        {
            new() { Id = 1, UserId = UserId, VinylId = 1, Quantity = 5, Vinyl = vinyl }
        };

        _cartRepoMock.Setup(r => r.GetByUserAsync(UserId)).ReturnsAsync(cartItems);
        _vinylRepoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(vinyl);

        var ex = await Assert.ThrowsAsync<InvalidOperationException>(
            () => _service.CheckoutAsync(UserId));
        Assert.Contains("Insufficient stock", ex.Message);
    }

    [Fact]
    public async Task CheckoutAsync_VinylNotFound_ThrowsInvalidOperation()
    {
        var cartItems = new List<CartItem>
        {
            new() { Id = 1, UserId = UserId, VinylId = 999, Quantity = 1 }
        };

        _cartRepoMock.Setup(r => r.GetByUserAsync(UserId)).ReturnsAsync(cartItems);
        _vinylRepoMock.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Vinyl?)null);

        var ex = await Assert.ThrowsAsync<InvalidOperationException>(
            () => _service.CheckoutAsync(UserId));
        Assert.Contains("not found", ex.Message);
    }

    [Fact]
    public async Task CheckoutAsync_MultipleItems_CalculatesTotalCorrectly()
    {
        var vinyl1 = CreateVinyl(1, 10);
        vinyl1.Price = 10m;
        var vinyl2 = CreateVinyl(2, 10);
        vinyl2.Price = 20m;

        var cartItems = new List<CartItem>
        {
            new() { Id = 1, UserId = UserId, VinylId = 1, Quantity = 2, Vinyl = vinyl1 },
            new() { Id = 2, UserId = UserId, VinylId = 2, Quantity = 3, Vinyl = vinyl2 }
        };

        _cartRepoMock.Setup(r => r.GetByUserAsync(UserId)).ReturnsAsync(cartItems);
        _vinylRepoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(vinyl1);
        _vinylRepoMock.Setup(r => r.GetByIdAsync(2)).ReturnsAsync(vinyl2);
        _vinylRepoMock.Setup(r => r.UpdateStockAsync(It.IsAny<int>(), It.IsAny<int>())).ReturnsAsync(true);
        _orderRepoMock.Setup(r => r.CreateAsync(It.IsAny<Order>()))
            .ReturnsAsync((Order o) => { o.Id = 1; return o; });
        _cartRepoMock.Setup(r => r.ClearAsync(UserId)).Returns(Task.CompletedTask);

        var result = await _service.CheckoutAsync(UserId);

        // (10 * 2) + (20 * 3) = 80
        Assert.Equal(80m, result.Total);
        Assert.Equal(2, result.Items.Count);
    }

    // GetOrdersAsync

    [Fact]
    public async Task GetOrdersAsync_ReturnsUserOrders()
    {
        var orders = new List<Order>
        {
            new()
            {
                Id = 1, UserId = UserId, Total = 50m, Status = "Confirmed",
                Items = new List<OrderItem>
                {
                    new() { Id = 1, VinylId = 1, Quantity = 2, UnitPrice = 25m }
                }
            }
        };
        _orderRepoMock.Setup(r => r.GetByUserAsync(UserId)).ReturnsAsync(orders);

        var result = (await _service.GetOrdersAsync(UserId)).ToList();

        Assert.Single(result);
        Assert.Equal(50m, result[0].Total);
        Assert.Equal(1, result[0].ItemCount);
    }

    // GetOrderByIdAsync

    [Fact]
    public async Task GetOrderByIdAsync_ExistingOrder_ReturnsOrder()
    {
        var order = new Order
        {
            Id = 1, UserId = UserId, Total = 29.99m, Status = "Confirmed",
            Items = new List<OrderItem>
            {
                new() { Id = 1, VinylId = 1, Quantity = 1, UnitPrice = 29.99m,
                    Vinyl = CreateVinyl() }
            }
        };
        _orderRepoMock.Setup(r => r.GetByIdAsync(1, UserId)).ReturnsAsync(order);

        var result = await _service.GetOrderByIdAsync(1, UserId);

        Assert.NotNull(result);
        Assert.Equal(29.99m, result.Total);
    }

    [Fact]
    public async Task GetOrderByIdAsync_NonExistingOrder_ReturnsNull()
    {
        _orderRepoMock.Setup(r => r.GetByIdAsync(999, UserId)).ReturnsAsync((Order?)null);

        Assert.Null(await _service.GetOrderByIdAsync(999, UserId));
    }
}