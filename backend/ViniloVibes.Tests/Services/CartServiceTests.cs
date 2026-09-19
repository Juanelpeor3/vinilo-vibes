using Moq;
using ViniloVibes.Api.DTOs.Cart;
using ViniloVibes.Api.Models;
using ViniloVibes.Api.Repositories.Interfaces;
using ViniloVibes.Api.Services;

namespace ViniloVibes.Tests.Services;

public class CartServiceTests
{
    private readonly Mock<ICartRepository> _repoMock;
    private readonly CartService _service;
    private const string UserId = "user-1";

    public CartServiceTests()
    {
        _repoMock = new Mock<ICartRepository>();
        _service = new CartService(_repoMock.Object);
    }

    private static Vinyl CreateVinyl(int id = 1) => new()
    {
        Id = id,
        Title = "Abbey Road",
        Artist = "The Beatles",
        Price = 29.99m,
        Stock = 10
    };

    private static CartItem CreateCartItem(int vinylId = 1, int quantity = 2) => new()
    {
        Id = 1,
        UserId = UserId,
        VinylId = vinylId,
        Quantity = quantity,
        Vinyl = CreateVinyl(vinylId)
    };

    // GetCartAsync

    [Fact]
    public async Task GetCartAsync_ReturnsUserCartItems()
    {
        var items = new List<CartItem> { CreateCartItem(), CreateCartItem(2) };
        _repoMock.Setup(r => r.GetByUserAsync(UserId)).ReturnsAsync(items);

        var result = (await _service.GetCartAsync(UserId)).ToList();

        Assert.Equal(2, result.Count);
        Assert.Equal("Abbey Road", result[0].VinylTitle);
    }

    [Fact]
    public async Task GetCartAsync_EmptyCart_ReturnsEmpty()
    {
        _repoMock.Setup(r => r.GetByUserAsync(UserId)).ReturnsAsync(new List<CartItem>());

        var result = await _service.GetCartAsync(UserId);

        Assert.Empty(result);
    }

    // AddToCartAsync

    [Fact]
    public async Task AddToCartAsync_NewItem_ReturnsCartItemDto()
    {
        var dto = new AddToCartDto { VinylId = 1, Quantity = 1 };
        var cartItem = CreateCartItem(1, 1);

        _repoMock.Setup(r => r.AddAsync(It.IsAny<CartItem>())).ReturnsAsync(cartItem);
        _repoMock.Setup(r => r.GetByUserAsync(UserId)).ReturnsAsync(new List<CartItem> { cartItem });

        var result = await _service.AddToCartAsync(UserId, dto);

        Assert.Equal(1, result.VinylId);
        Assert.Equal("Abbey Road", result.VinylTitle);
        Assert.Equal(29.99m, result.VinylPrice);
    }

    // UpdateQuantityAsync

    [Fact]
    public async Task UpdateQuantityAsync_ExistingItem_ReturnsUpdated()
    {
        var updatedItem = CreateCartItem(1, 5);
        var dto = new UpdateCartItemDto { Quantity = 5 };

        _repoMock.Setup(r => r.UpdateQuantityAsync(UserId, 1, 5)).ReturnsAsync(updatedItem);
        _repoMock.Setup(r => r.GetByUserAsync(UserId)).ReturnsAsync(new List<CartItem> { updatedItem });

        var result = await _service.UpdateQuantityAsync(UserId, 1, dto);

        Assert.NotNull(result);
        Assert.Equal(5, result.Quantity);
    }

    [Fact]
    public async Task UpdateQuantityAsync_NonExistingItem_ReturnsNull()
    {
        var dto = new UpdateCartItemDto { Quantity = 5 };
        _repoMock.Setup(r => r.UpdateQuantityAsync(UserId, 999, 5)).ReturnsAsync((CartItem?)null);

        var result = await _service.UpdateQuantityAsync(UserId, 999, dto);

        Assert.Null(result);
    }

    // RemoveFromCartAsync

    [Fact]
    public async Task RemoveFromCartAsync_ExistingItem_ReturnsTrue()
    {
        _repoMock.Setup(r => r.RemoveAsync(UserId, 1)).ReturnsAsync(true);

        Assert.True(await _service.RemoveFromCartAsync(UserId, 1));
    }

    [Fact]
    public async Task RemoveFromCartAsync_NonExistingItem_ReturnsFalse()
    {
        _repoMock.Setup(r => r.RemoveAsync(UserId, 999)).ReturnsAsync(false);

        Assert.False(await _service.RemoveFromCartAsync(UserId, 999));
    }

    // ClearCartAsync

    [Fact]
    public async Task ClearCartAsync_CallsRepository()
    {
        _repoMock.Setup(r => r.ClearAsync(UserId)).Returns(Task.CompletedTask);

        await _service.ClearCartAsync(UserId);

        _repoMock.Verify(r => r.ClearAsync(UserId), Times.Once);
    }
}