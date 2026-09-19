using Moq;
using ViniloVibes.Api.Models;
using ViniloVibes.Api.DTOs.Vinyls;
using ViniloVibes.Api.Repositories.Interfaces;
using ViniloVibes.Api.Services;

namespace ViniloVibes.Tests.Services;

public class VinylServiceTests
{
    private readonly Mock<IVinylRepository> _repoMock;
    private readonly VinylService _service;

    public VinylServiceTests()
    {
        _repoMock = new Mock<IVinylRepository>();
        _service = new VinylService(_repoMock.Object);
    }

    private static Vinyl CreateVinyl(int id = 1, string title = "Abbey Road", decimal price = 29.99m, int stock = 10)
    {
        return new Vinyl
        {
            Id = id,
            Title = title,
            Artist = "The Beatles",
            Price = price,
            Stock = stock,
            GenreId = 1,
            Genre = new Genre { Id = 1, Name = "Rock" },
            Ratings = new List<Rating>
            {
                new() { Id = 1, Value = 5, UserId = "user1", VinylId = id },
                new() { Id = 2, Value = 3, UserId = "user2", VinylId = id }
            }
        };
    }

    // GetAllAsync

    [Fact]
    public async Task GetAllAsync_ReturnsAllVinyls()
    {
        var vinyls = new List<Vinyl> { CreateVinyl(1), CreateVinyl(2, "Let It Be") };
        _repoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(vinyls);

        var result = (await _service.GetAllAsync()).ToList();

        Assert.Equal(2, result.Count);
        Assert.Equal("Abbey Road", result[0].Title);
    }

    [Fact]
    public async Task GetAllAsync_EmptyList_ReturnsEmpty()
    {
        _repoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Vinyl>());

        var result = await _service.GetAllAsync();

        Assert.Empty(result);
    }

    // GetByIdAsync

    [Fact]
    public async Task GetByIdAsync_ExistingId_ReturnsVinyl()
    {
        var vinyl = CreateVinyl();
        _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(vinyl);

        var result = await _service.GetByIdAsync(1);

        Assert.NotNull(result);
        Assert.Equal("Abbey Road", result.Title);
        Assert.Equal("Rock", result.GenreName);
    }

    [Fact]
    public async Task GetByIdAsync_NonExistingId_ReturnsNull()
    {
        _repoMock.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Vinyl?)null);

        var result = await _service.GetByIdAsync(999);

        Assert.Null(result);
    }

    // GetByGenreAsync

    [Fact]
    public async Task GetByGenreAsync_ReturnsFilteredVinyls()
    {
        var vinyls = new List<Vinyl> { CreateVinyl() };
        _repoMock.Setup(r => r.GetByGenreAsync(1)).ReturnsAsync(vinyls);

        var result = (await _service.GetByGenreAsync(1)).ToList();

        Assert.Single(result);
        Assert.Equal("Rock", result[0].GenreName);
    }

    // CreateAsync

    [Fact]
    public async Task CreateAsync_ReturnsCreatedVinyl()
    {
        var dto = new CreateVinylDto
        {
            Title = "Dark Side",
            Artist = "Pink Floyd",
            Price = 34.99m,
            Stock = 5,
            GenreId = 1
        };

        _repoMock.Setup(r => r.CreateAsync(It.IsAny<Vinyl>()))
            .ReturnsAsync((Vinyl v) =>
            {
                v.Id = 10;
                v.Genre = new Genre { Id = 1, Name = "Rock" };
                v.Ratings = [];
                return v;
            });

        var result = await _service.CreateAsync(dto);

        Assert.Equal("Dark Side", result.Title);
        Assert.Equal(10, result.Id);
    }

    // UpdateAsync

    [Fact]
    public async Task UpdateAsync_ExistingId_ReturnsUpdatedVinyl()
    {
        var updated = CreateVinyl();
        updated.Title = "Updated Title";
        _repoMock.Setup(r => r.UpdateAsync(1, It.IsAny<Vinyl>())).ReturnsAsync(updated);

        var dto = new UpdateVinylDto
        {
            Title = "Updated Title",
            Artist = "The Beatles",
            Price = 29.99m,
            Stock = 10,
            GenreId = 1
        };

        var result = await _service.UpdateAsync(1, dto);

        Assert.NotNull(result);
        Assert.Equal("Updated Title", result.Title);
    }

    [Fact]
    public async Task UpdateAsync_NonExistingId_ReturnsNull()
    {
        _repoMock.Setup(r => r.UpdateAsync(999, It.IsAny<Vinyl>())).ReturnsAsync((Vinyl?)null);

        var dto = new UpdateVinylDto { Title = "X", Artist = "X", Price = 1, Stock = 1, GenreId = 1 };
        var result = await _service.UpdateAsync(999, dto);

        Assert.Null(result);
    }

    // DeleteAsync

    [Fact]
    public async Task DeleteAsync_ExistingId_ReturnsTrue()
    {
        _repoMock.Setup(r => r.DeleteAsync(1)).ReturnsAsync(true);

        Assert.True(await _service.DeleteAsync(1));
    }

    [Fact]
    public async Task DeleteAsync_NonExistingId_ReturnsFalse()
    {
        _repoMock.Setup(r => r.DeleteAsync(999)).ReturnsAsync(false);

        Assert.False(await _service.DeleteAsync(999));
    }

    // UpdateStockAsync

    [Fact]
    public async Task UpdateStockAsync_ValidQuantity_ReturnsTrue()
    {
        _repoMock.Setup(r => r.UpdateStockAsync(1, 2)).ReturnsAsync(true);

        Assert.True(await _service.UpdateStockAsync(1, 2));
    }

    [Fact]
    public async Task UpdateStockAsync_InsufficientStock_ReturnsFalse()
    {
        _repoMock.Setup(r => r.UpdateStockAsync(1, 100)).ReturnsAsync(false);

        Assert.False(await _service.UpdateStockAsync(1, 100));
    }

    // MapToDto (rating calculations)

    [Fact]
    public async Task GetByIdAsync_WithRatings_CalculatesAverageCorrectly()
    {
        var vinyl = CreateVinyl(); // ratings: 5 y 3
        _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(vinyl);

        var result = await _service.GetByIdAsync(1);

        Assert.NotNull(result);
        Assert.Equal(4.0, result.AverageRating);
        Assert.Equal(2, result.RatingCount);
    }

    [Fact]
    public async Task GetByIdAsync_WithNoRatings_AverageIsNull()
    {
        var vinyl = CreateVinyl();
        vinyl.Ratings = [];
        _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(vinyl);

        var result = await _service.GetByIdAsync(1);

        Assert.NotNull(result);
        Assert.Null(result.AverageRating);
        Assert.Equal(0, result.RatingCount);
    }
}