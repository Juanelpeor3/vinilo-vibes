namespace ViniloVibes.Api.Models;

public class OrderItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;

    public int VinylId { get; set; }
    public Vinyl Vinyl { get; set; } = null!;
}
