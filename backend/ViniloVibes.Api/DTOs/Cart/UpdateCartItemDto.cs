using System.ComponentModel.DataAnnotations;

namespace ViniloVibes.Api.DTOs.Cart;

public class UpdateCartItemDto
{
    [Required]
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
}