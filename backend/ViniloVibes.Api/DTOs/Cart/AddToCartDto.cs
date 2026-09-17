using System.ComponentModel.DataAnnotations;

namespace ViniloVibes.Api.DTOs.Cart;

public class AddToCartDto
{
    [Required]
    public int VinylId { get; set; }

    [Required]
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; } = 1;
}