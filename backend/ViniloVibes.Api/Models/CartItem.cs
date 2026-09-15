namespace ViniloVibes.Api.Models;

public class CartItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }

    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;

    public int VinylId { get; set; }
    public Vinyl Vinyl { get; set; } = null!;
}
