namespace ViniloVibes.Api.Models;

public class Vinyl
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public int? ReleaseYear { get; set; }

    public int GenreId { get; set; }
    public Genre Genre { get; set; } = null!;

    public ICollection<Rating> Ratings { get; set; } = [];
}
