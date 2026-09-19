using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;
using ViniloVibes.Api.DTOs.Auth;
using ViniloVibes.Api.Models;
using ViniloVibes.Api.Services;
using ViniloVibes.Tests.Helpers;

namespace ViniloVibes.Tests.Services;

public class AuthServiceTests
{
    private readonly Mock<UserManager<ApplicationUser>> _userManagerMock;
    private readonly IConfiguration _configuration;
    private readonly AuthService _service;

    public AuthServiceTests()
    {
        _userManagerMock = MockUserManager.Create();

        _configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Jwt:Key"] = "test-super-secret-key-minimum-32-characters-long!",
                ["Jwt:Issuer"] = "TestIssuer",
                ["Jwt:Audience"] = "TestAudience"
            })
            .Build();

        _service = new AuthService(_userManagerMock.Object, _configuration);
    }

    // RegisterAsync

    [Fact]
    public async Task RegisterAsync_ValidData_ReturnsTokenAndUserInfo()
    {
        var dto = new RegisterDto
        {
            Email = "test@example.com",
            Password = "Test123",
            FullName = "Test User",
            Role = "user"
        };

        _userManagerMock.Setup(u => u.CreateAsync(It.IsAny<ApplicationUser>(), dto.Password))
            .ReturnsAsync(IdentityResult.Success);
        _userManagerMock.Setup(u => u.AddToRoleAsync(It.IsAny<ApplicationUser>(), "user"))
            .ReturnsAsync(IdentityResult.Success);

        var result = await _service.RegisterAsync(dto);

        Assert.NotNull(result.Token);
        Assert.NotEmpty(result.Token);
        Assert.Equal("test@example.com", result.Email);
        Assert.Equal("Test User", result.FullName);
        Assert.Equal("user", result.Role);
    }

    [Fact]
    public async Task RegisterAsync_DuplicateEmail_ThrowsInvalidOperation()
    {
        var dto = new RegisterDto
        {
            Email = "existing@example.com",
            Password = "Test123",
            FullName = "Test",
            Role = "user"
        };

        _userManagerMock.Setup(u => u.CreateAsync(It.IsAny<ApplicationUser>(), dto.Password))
            .ReturnsAsync(IdentityResult.Failed(
                new IdentityError { Description = "Email already taken" }));

        await Assert.ThrowsAsync<InvalidOperationException>(
            () => _service.RegisterAsync(dto));
    }

    [Fact]
    public async Task RegisterAsync_WeakPassword_ThrowsInvalidOperation()
    {
        var dto = new RegisterDto
        {
            Email = "test@example.com",
            Password = "123",
            FullName = "Test",
            Role = "user"
        };

        _userManagerMock.Setup(u => u.CreateAsync(It.IsAny<ApplicationUser>(), dto.Password))
            .ReturnsAsync(IdentityResult.Failed(
                new IdentityError { Description = "Password too weak" }));

        var ex = await Assert.ThrowsAsync<InvalidOperationException>(
            () => _service.RegisterAsync(dto));
        Assert.Contains("Password too weak", ex.Message);
    }

    // LoginAsync

    [Fact]
    public async Task LoginAsync_ValidCredentials_ReturnsToken()
    {
        var user = new ApplicationUser
        {
            Id = "1",
            Email = "test@example.com",
            UserName = "test",
            FullName = "Test User"
        };

        var dto = new LoginDto { Email = "test@example.com", Password = "Test123" };

        _userManagerMock.Setup(u => u.FindByEmailAsync(dto.Email)).ReturnsAsync(user);
        _userManagerMock.Setup(u => u.CheckPasswordAsync(user, dto.Password)).ReturnsAsync(true);
        _userManagerMock.Setup(u => u.GetRolesAsync(user)).ReturnsAsync(new List<string> { "user" });

        var result = await _service.LoginAsync(dto);

        Assert.NotNull(result.Token);
        Assert.Equal("test@example.com", result.Email);
        Assert.Equal("user", result.Role);
    }

    [Fact]
    public async Task LoginAsync_InvalidEmail_ThrowsUnauthorized()
    {
        var dto = new LoginDto { Email = "nobody@example.com", Password = "Test123" };
        _userManagerMock.Setup(u => u.FindByEmailAsync(dto.Email)).ReturnsAsync((ApplicationUser?)null);

        await Assert.ThrowsAsync<UnauthorizedAccessException>(
            () => _service.LoginAsync(dto));
    }

    [Fact]
    public async Task LoginAsync_WrongPassword_ThrowsUnauthorized()
    {
        var user = new ApplicationUser
        {
            Id = "1",
            Email = "test@example.com",
            UserName = "test",
            FullName = "Test User"
        };

        var dto = new LoginDto { Email = "test@example.com", Password = "WrongPass" };

        _userManagerMock.Setup(u => u.FindByEmailAsync(dto.Email)).ReturnsAsync(user);
        _userManagerMock.Setup(u => u.CheckPasswordAsync(user, dto.Password)).ReturnsAsync(false);

        await Assert.ThrowsAsync<UnauthorizedAccessException>(
            () => _service.LoginAsync(dto));
    }

    [Fact]
    public async Task LoginAsync_AdminRole_ReturnsAdminInResponse()
    {
        var user = new ApplicationUser
        {
            Id = "1",
            Email = "admin@example.com",
            UserName = "admin",
            FullName = "Admin"
        };

        var dto = new LoginDto { Email = "admin@example.com", Password = "Admin123" };

        _userManagerMock.Setup(u => u.FindByEmailAsync(dto.Email)).ReturnsAsync(user);
        _userManagerMock.Setup(u => u.CheckPasswordAsync(user, dto.Password)).ReturnsAsync(true);
        _userManagerMock.Setup(u => u.GetRolesAsync(user)).ReturnsAsync(new List<string> { "admin" });

        var result = await _service.LoginAsync(dto);

        Assert.Equal("admin", result.Role);
    }
}