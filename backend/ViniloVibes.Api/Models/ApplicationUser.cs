using Microsoft.AspNetCore.Identity;

namespace ViniloVibes.Api.Models;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;

    public ICollection<Rating> Ratings { get; set; } = [];
    public ICollection<CartItem> CartItems { get; set; } = [];
    public ICollection<Order> Orders { get; set; } = [];
}
