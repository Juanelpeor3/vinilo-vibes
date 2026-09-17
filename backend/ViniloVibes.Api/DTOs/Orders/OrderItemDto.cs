namespace ViniloVibes.Api.DTOs.Orders;

public class OrderItemDto
{
    public int Id { get; set; }
    public int VinylId { get; set; }
    public string VinylTitle { get; set; } = string.Empty;
    public string VinylArtist { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}