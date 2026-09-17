namespace ViniloVibes.Api.DTOs.Orders;

public class OrderDto
{
    public int Id { get; set; }
    public decimal Total { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Status { get; set; } = string.Empty;
    public ICollection<OrderItemDto> Items { get; set; } = [];
}