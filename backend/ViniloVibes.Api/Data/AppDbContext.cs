using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ViniloVibes.Api.Models;

namespace ViniloVibes.Api.Data;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Vinyl> Vinyls => Set<Vinyl>();
    public DbSet<Genre> Genres => Set<Genre>();
    public DbSet<Rating> Ratings => Set<Rating>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Vinyl
        builder.Entity<Vinyl>(e =>
        {
            e.Property(v => v.Price).HasPrecision(10, 2);
            e.HasOne(v => v.Genre)
                .WithMany(g => g.Vinyls)
                .HasForeignKey(v => v.GenreId);
        });

        // Rating: un usuario solo puede valorar un vinilo una vez
        builder.Entity<Rating>(e =>
        {
            e.HasIndex(r => new { r.UserId, r.VinylId }).IsUnique();
            e.Property(r => r.Value).IsRequired();
            e.HasOne(r => r.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(r => r.UserId);
            e.HasOne(r => r.Vinyl)
                .WithMany(v => v.Ratings)
                .HasForeignKey(r => r.VinylId);
        });

        // CartItem: un usuario solo puede tener un ítem por vinilo en el carrito
        builder.Entity<CartItem>(e =>
        {
            e.HasIndex(c => new { c.UserId, c.VinylId }).IsUnique();
            e.HasOne(c => c.User)
                .WithMany(u => u.CartItems)
                .HasForeignKey(c => c.UserId);
            e.HasOne(c => c.Vinyl)
                .WithMany()
                .HasForeignKey(c => c.VinylId);
        });

        // Order
        builder.Entity<Order>(e =>
        {
            e.Property(o => o.Total).HasPrecision(10, 2);
            e.HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);
        });

        // OrderItem
        builder.Entity<OrderItem>(e =>
        {
            e.Property(oi => oi.UnitPrice).HasPrecision(10, 2);
            e.HasOne(oi => oi.Order)
                .WithMany(o => o.Items)
                .HasForeignKey(oi => oi.OrderId);
            e.HasOne(oi => oi.Vinyl)
                .WithMany()
                .HasForeignKey(oi => oi.VinylId);
        });
    }
}
