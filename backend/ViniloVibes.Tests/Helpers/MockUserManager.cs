using Microsoft.AspNetCore.Identity;
using Moq;
using ViniloVibes.Api.Models;

namespace ViniloVibes.Tests.Helpers;

/// <summary>
/// Helper para crear un mock de UserManager con la configuración mínima necesaria.
/// </summary>
public static class MockUserManager
{
    public static Mock<UserManager<ApplicationUser>> Create()
    {
        var store = new Mock<IUserStore<ApplicationUser>>();
        return new Mock<UserManager<ApplicationUser>>(
            store.Object, null!, null!, null!, null!, null!, null!, null!, null!);
    }
}