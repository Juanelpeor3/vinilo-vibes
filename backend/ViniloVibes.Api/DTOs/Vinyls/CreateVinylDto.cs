using System.ComponentModel.DataAnnotations;

namespace ViniloVibes.Api.DTOs.Vinyls;

public class CreateVinylDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Artist { get; set; } = string.Empty;

    public string? ImageUrl { get; set; }
    public string? Description { get; set; }

    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }

    [Required]
    [Range(0, int.MaxValue)]
    public int Stock { get; set; }

    public int? ReleaseYear { get; set; }

    [Required]
    public int GenreId { get; set; }
}