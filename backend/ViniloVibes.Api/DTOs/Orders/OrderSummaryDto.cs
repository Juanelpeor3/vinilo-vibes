namespace ViniloVibes.Api.DTOs.Orders;

public class OrderSummaryDto
{
    public int Id { get; set; }
    public decimal Total { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Status { get; set; } = string.Empty;
    public int ItemCount { get; set; }
}