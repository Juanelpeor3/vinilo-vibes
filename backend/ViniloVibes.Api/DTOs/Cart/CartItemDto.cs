namespace ViniloVibes.Api.DTOs.Cart;

public class CartItemDto
{
    public int Id { get; set; }
    public int VinylId { get; set; }
    public string VinylTitle { get; set; } = string.Empty;
    public string VinylArtist { get; set; } = string.Empty;
    public string? VinylImageUrl { get; set; }
    public decimal VinylPrice { get; set; }
    public int Quantity { get; set; }
}