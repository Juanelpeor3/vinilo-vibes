namespace ViniloVibes.Api.Models;

public class Rating
{
    public int Id { get; set; }
    public int Value { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;

    public int VinylId { get; set; }
    public Vinyl Vinyl { get; set; } = null!;
}
