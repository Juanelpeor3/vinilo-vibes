using Microsoft.AspNetCore.Identity;
using ViniloVibes.Api.Models;

namespace ViniloVibes.Api.Data;

public static class SeedData
{
    public static async Task SeedAsync(AppDbContext db, UserManager<ApplicationUser> userManager)
    {
        if (db.Genres.Any()) return;

        var admin = await userManager.FindByEmailAsync("admin@example.com");
        var adminId = admin!.Id;

        var rock = new Genre { Name = "Rock" };
        var jazz = new Genre { Name = "Jazz" };
        var pop = new Genre { Name = "Pop" };
        var hiphop = new Genre { Name = "Hiphop" };
        var electronica = new Genre { Name = "Electrónica" };

        db.Genres.AddRange(rock, jazz, pop, hiphop, electronica);
        await db.SaveChangesAsync();

        var vinyls = new Vinyl[]
        {
            new() { Title = "Abbey Road", Artist = "The Beatles", ReleaseYear = 1969, GenreId = rock.Id, Price = 29.99m, Stock = 7, Description = "Álbum clásico de rock lanzado en 1969.", ImageUrl = "https://m.media-amazon.com/images/I/91YlTtiGi0L._UF894,1000_QL80_.jpg" },
            new() { Title = "The Dark Side of the Moon", Artist = "Pink Floyd", ReleaseYear = 1973, GenreId = rock.Id, Price = 36.99m, Stock = 8, Description = "Rock progresivo con arte del prisma.", ImageUrl = "https://m.media-amazon.com/images/I/61hw9WloObL._UF894,1000_QL80_.jpg" },
            new() { Title = "Sticky Fingers", Artist = "The Rolling Stones", ReleaseYear = 1971, GenreId = rock.Id, Price = 34.99m, Stock = 7, Description = "Album clasico con arte de Andy Warhol.", ImageUrl = "https://m.media-amazon.com/images/I/61gzYP4EHhL._UF1000,1000_QL80_.jpg" },
            new() { Title = "Nevermind", Artist = "Nirvana", ReleaseYear = 1991, GenreId = rock.Id, Price = 32.99m, Stock = 9, Description = "Album iconico del grunge de los 90.", ImageUrl = "https://m.media-amazon.com/images/I/61ZhsEYnSdL.jpg" },
            new() { Title = "The Velvet Underground & Nico", Artist = "The Velvet Underground", ReleaseYear = 1967, GenreId = rock.Id, Price = 29.99m, Stock = 6, Description = "Rock experimental con portada de banana.", ImageUrl = "https://m.media-amazon.com/images/I/81GsdUCxbaL.jpg" },
            new() { Title = "Fetch the Bolt Cutters", Artist = "Fiona Apple", ReleaseYear = 2020, GenreId = rock.Id, Price = 27.99m, Stock = 6, Description = "Rock alternativo experimental.", ImageUrl = "https://m.media-amazon.com/images/I/51kNJkdQpiL._UF894,1000_QL80_.jpg" },
            new() { Title = "The Car", Artist = "Arctic Monkeys", ReleaseYear = 2022, GenreId = rock.Id, Price = 31.99m, Stock = 6, Description = "Rock alternativo con sonido cinematografico.", ImageUrl = "https://m.media-amazon.com/images/I/71ZiZma5W8L._UF894,1000_QL80_.jpg" },

            new() { Title = "Kind of Blue", Artist = "Miles Davis", ReleaseYear = 1959, GenreId = jazz.Id, Price = 24.99m, Stock = 7, Description = "Uno de los discos de jazz más influyentes.", ImageUrl = "https://m.media-amazon.com/images/I/71Hp3rhK4OL._UF894,1000_QL80_.jpg" },
            new() { Title = "Blue Train", Artist = "John Coltrane", ReleaseYear = 1958, GenreId = jazz.Id, Price = 28.99m, Stock = 4, Description = "Clasico del hard bop.", ImageUrl = "https://m.media-amazon.com/images/I/71aSnR4uTNL._UF894,1000_QL80_.jpg" },
            new() { Title = "Time Out", Artist = "Dave Brubeck Quartet", ReleaseYear = 1959, GenreId = jazz.Id, Price = 27.99m, Stock = 3, Description = "Jazz con ritmos poco convencionales.", ImageUrl = "https://m.media-amazon.com/images/I/916B65pg7OL._UF894,1000_QL80_.jpg" },
            new() { Title = "Head Hunters", Artist = "Herbie Hancock", ReleaseYear = 1973, GenreId = jazz.Id, Price = 31.99m, Stock = 5, Description = "Fusion innovadora entre jazz y funk.", ImageUrl = "https://m.media-amazon.com/images/I/A1YxWj1hO7L._UF894,1000_QL80_.jpg" },
            new() { Title = "We Are", Artist = "Jon Batiste", ReleaseYear = 2021, GenreId = jazz.Id, Price = 28.99m, Stock = 5, Description = "Jazz moderno con influencias soul.", ImageUrl = "https://m.media-amazon.com/images/I/71oqp+a27YL._UF894,1000_QL80_.jpg" },
            new() { Title = "World Music Radio", Artist = "Jon Batiste", ReleaseYear = 2023, GenreId = jazz.Id, Price = 28.99m, Stock = 4, Description = "Jazz moderno con mezcla global.", ImageUrl = "https://m.media-amazon.com/images/I/51iMZckBSsL._UF894,1000_QL80_.jpg" },

            new() { Title = "Thriller", Artist = "Michael Jackson", ReleaseYear = 1982, GenreId = pop.Id, Price = 27.99m, Stock = 0, Description = "El álbum más vendido de la historia.", ImageUrl = "https://m.media-amazon.com/images/I/81ogsUqshzL._UF894,1000_QL80_.jpg" },
            new() { Title = "Purple Rain", Artist = "Prince", ReleaseYear = 1984, GenreId = pop.Id, Price = 33.99m, Stock = 6, Description = "Album pop con fuerte influencia rock.", ImageUrl = "https://m.media-amazon.com/images/I/81twmQBBnQL._UF894,1000_QL80_.jpg" },
            new() { Title = "Bad", Artist = "Michael Jackson", ReleaseYear = 1987, GenreId = pop.Id, Price = 30.99m, Stock = 8, Description = "Pop iconico de los años 80.", ImageUrl = "https://m.media-amazon.com/images/I/71mlCtsYS8L.jpg" },
            new() { Title = "Future Nostalgia", Artist = "Dua Lipa", ReleaseYear = 2020, GenreId = pop.Id, Price = 29.99m, Stock = 12, Description = "Pop moderno con influencia disco.", ImageUrl = "https://m.media-amazon.com/images/I/41ADPXLGixL._UF894,1000_QL80_.jpg" },
            new() { Title = "After Hours", Artist = "The Weeknd", ReleaseYear = 2020, GenreId = pop.Id, Price = 31.99m, Stock = 10, Description = "Pop oscuro con sonidos synthwave.", ImageUrl = "https://m.media-amazon.com/images/I/71liI3Bs58L.jpg" },
            new() { Title = "Sour", Artist = "Olivia Rodrigo", ReleaseYear = 2021, GenreId = pop.Id, Price = 30.99m, Stock = 15, Description = "Pop con energia juvenil y emocional.", ImageUrl = "https://m.media-amazon.com/images/I/61vCHwWrv9L._UF894,1000_QL80_.jpg" },
            new() { Title = "Happier Than Ever", Artist = "Billie Eilish", ReleaseYear = 2021, GenreId = pop.Id, Price = 29.99m, Stock = 11, Description = "Pop introspectivo con cambios de ritmo.", ImageUrl = "https://m.media-amazon.com/images/I/61TC6oJHbsL._UF894,1000_QL80_.jpg" },
            new() { Title = "Justice", Artist = "Justin Bieber", ReleaseYear = 2021, GenreId = pop.Id, Price = 27.99m, Stock = 8, Description = "Pop contemporaneo con sonidos R&B.", ImageUrl = "https://m.media-amazon.com/images/I/A1YhiStV5zL._UF894,1000_QL80_.jpg" },
            new() { Title = "Midnights", Artist = "Taylor Swift", ReleaseYear = 2022, GenreId = pop.Id, Price = 34.99m, Stock = 14, Description = "Pop atmosferico con narrativa nocturna.", ImageUrl = "https://m.media-amazon.com/images/I/71-wkZnha6L.jpg" },
            new() { Title = "Renaissance", Artist = "Beyonce", ReleaseYear = 2022, GenreId = pop.Id, Price = 36.99m, Stock = 9, Description = "Pop con fuerte influencia dance.", ImageUrl = "https://m.media-amazon.com/images/I/81bIA91keyL._UF894,1000_QL80_.jpg" },
            new() { Title = "Did You Know That There's a Tunnel Under Ocean Blvd", Artist = "Lana Del Rey", ReleaseYear = 2023, GenreId = pop.Id, Price = 32.50m, Stock = 6, Description = "Pop alternativo con atmosfera melancolica.", ImageUrl = "https://m.media-amazon.com/images/I/610fyB2V7iL._UF894,1000_QL80_.jpg" },
            new() { Title = "GUTS", Artist = "Olivia Rodrigo", ReleaseYear = 2023, GenreId = pop.Id, Price = 30.99m, Stock = 12, Description = "Pop con energia rock y actitud directa.", ImageUrl = "https://m.media-amazon.com/images/I/81J1kRLIQlL._UF894,1000_QL80_.jpg" },
            new() { Title = "That! Feels Good!", Artist = "Jessie Ware", ReleaseYear = 2023, GenreId = pop.Id, Price = 29.99m, Stock = 7, Description = "Pop con influencia disco clasica.", ImageUrl = "https://m.media-amazon.com/images/I/91lLT5OtX9L._UF894,1000_QL80_.jpg" },
            new() { Title = "The Art of Loving", Artist = "Olivia Dean", ReleaseYear = 2025, GenreId = pop.Id, Price = 31.99m, Stock = 8, Description = "Album pop/R&B aclamado en 2025 con temas emocionalmente intensos.", ImageUrl = "https://m.media-amazon.com/images/I/71jS2SOCW4L._UF894,1000_QL80_.jpg" },
            new() { Title = "Choke Enough", Artist = "Oklou", ReleaseYear = 2025, GenreId = pop.Id, Price = 28.99m, Stock = 7, Description = "Pop experimental y electronico destacado en listas de mejores álbumes de 2025.", ImageUrl = "https://m.media-amazon.com/images/I/91GSXDRLLNL.jpg" },

            new() { Title = "The Miseducation of Lauryn Hill", Artist = "Lauryn Hill", ReleaseYear = 1998, GenreId = hiphop.Id, Price = 34.99m, Stock = 5, Description = "Fusion de hiphop y R&B con fuerte mensaje.", ImageUrl = "https://m.media-amazon.com/images/I/81VJiP1Ix6L.jpg" },
            new() { Title = "Straight Outta Compton", Artist = "N.W.A", ReleaseYear = 1988, GenreId = hiphop.Id, Price = 29.99m, Stock = 7, Description = "Hiphop pionero de la costa oeste.", ImageUrl = "https://m.media-amazon.com/images/I/6112-FxD2BL._UF894,1000_QL80_.jpg" },
            new() { Title = "Illmatic", Artist = "Nas", ReleaseYear = 1994, GenreId = hiphop.Id, Price = 31.99m, Stock = 6, Description = "Album clasico del hiphop neoyorquino.", ImageUrl = "https://m.media-amazon.com/images/I/81-XH6eTnsL._UF350,350_QL80_.jpg" },
            new() { Title = "Enter the Wu-Tang (36 Chambers)", Artist = "Wu-Tang Clan", ReleaseYear = 1993, GenreId = hiphop.Id, Price = 30.99m, Stock = 5, Description = "Debut legendario del colectivo Wu-Tang.", ImageUrl = "https://m.media-amazon.com/images/I/71GMnsnfwIL._UF894,1000_QL80_.jpg" },
            new() { Title = "RTJ4", Artist = "Run The Jewels", ReleaseYear = 2020, GenreId = hiphop.Id, Price = 28.99m, Stock = 8, Description = "Hiphop politico y contundente.", ImageUrl = "https://m.media-amazon.com/images/I/61yWO76iCtL._UF350,350_QL50_.jpg" },
            new() { Title = "Call Me If You Get Lost", Artist = "Tyler, The Creator", ReleaseYear = 2021, GenreId = hiphop.Id, Price = 32.99m, Stock = 9, Description = "Hiphop creativo con produccion sofisticada.", ImageUrl = "https://m.media-amazon.com/images/I/81xsEabM4fL.jpg" },
            new() { Title = "Mr. Morale & the Big Steppers", Artist = "Kendrick Lamar", ReleaseYear = 2022, GenreId = hiphop.Id, Price = 33.99m, Stock = 7, Description = "Hiphop introspectivo y conceptual.", ImageUrl = "https://m.media-amazon.com/images/I/518947INsaL._UF894,1000_QL80_.jpg" },
            new() { Title = "Un Verano Sin Ti", Artist = "Bad Bunny", ReleaseYear = 2022, GenreId = hiphop.Id, Price = 35.99m, Stock = 13, Description = "Hiphop latino con fusion urbana.", ImageUrl = "https://m.media-amazon.com/images/I/91vkwlCj4mL._UF894,1000_QL80_.jpg" },
            new() { Title = "Utopia", Artist = "Travis Scott", ReleaseYear = 2023, GenreId = hiphop.Id, Price = 33.99m, Stock = 10, Description = "Hiphop experimental con produccion futurista.", ImageUrl = "https://m.media-amazon.com/images/I/61EhflTm0YL._UF894,1000_QL80_.jpg" },
            new() { Title = "Cabin in the Sky", Artist = "De La Soul", ReleaseYear = 2025, GenreId = hiphop.Id, Price = 29.99m, Stock = 5, Description = "Hip-hop clasico de De La Soul, lanzado en noviembre de 2025.", ImageUrl = "https://m.media-amazon.com/images/I/61WArXI2ovL._UF894,1000_QL80_.jpg" },

            new() { Title = "Discovery", Artist = "Daft Punk", ReleaseYear = 2001, GenreId = electronica.Id, Price = 35.99m, Stock = 8, Description = "Album iconico de la musica electronica.", ImageUrl = "https://m.media-amazon.com/images/I/81G3AiMU+pL._UF894,1000_QL80_.jpg" },
            new() { Title = "Random Access Memories", Artist = "Daft Punk", ReleaseYear = 2013, GenreId = electronica.Id, Price = 38.99m, Stock = 6, Description = "Electronica con influencias disco y funk.", ImageUrl = "https://m.media-amazon.com/images/I/610hEsM51TL._UF894,1000_QL80_.jpg" },
            new() { Title = "Homework", Artist = "Daft Punk", ReleaseYear = 1997, GenreId = electronica.Id, Price = 32.99m, Stock = 9, Description = "Debut influyente del french house.", ImageUrl = "https://m.media-amazon.com/images/I/81DSfiba5fL._UF894,1000_QL80_.jpg" },
            new() { Title = "Music Has the Right to Children", Artist = "Boards of Canada", ReleaseYear = 1998, GenreId = electronica.Id, Price = 33.99m, Stock = 5, Description = "Electronica ambiental con sonido nostalgico.", ImageUrl = "https://m.media-amazon.com/images/I/91t5PQmONzL._UF894,1000_QL80_.jpg" },
            new() { Title = "Suddenly", Artist = "Caribou", ReleaseYear = 2020, GenreId = electronica.Id, Price = 26.99m, Stock = 7, Description = "Electronica con elementos psicodelicos.", ImageUrl = "https://m.media-amazon.com/images/I/61SfeR2Q5fL._AC_UF1000,1000_QL80_.jpg" },
        };

        db.Vinyls.AddRange(vinyls);
        await db.SaveChangesAsync();

        // Ratings (from Supabase data, all assigned to admin)
        var ratings = new Rating[]
        {
            new() { UserId = adminId, VinylId = vinyls[0].Id, Value = 4 },  // Abbey Road (avg of 5+2)
            new() { UserId = adminId, VinylId = vinyls[1].Id, Value = 4 },  // Dark Side of the Moon
            new() { UserId = adminId, VinylId = vinyls[3].Id, Value = 3 },  // Nevermind
            new() { UserId = adminId, VinylId = vinyls[4].Id, Value = 2 },  // Velvet Underground
            new() { UserId = adminId, VinylId = vinyls[5].Id, Value = 5 },  // Fetch the Bolt Cutters
            new() { UserId = adminId, VinylId = vinyls[7].Id, Value = 4 },  // Kind of Blue
            new() { UserId = adminId, VinylId = vinyls[8].Id, Value = 4 },  // Blue Train
            new() { UserId = adminId, VinylId = vinyls[9].Id, Value = 1 },  // Time Out
            new() { UserId = adminId, VinylId = vinyls[10].Id, Value = 1 }, // Head Hunters
            new() { UserId = adminId, VinylId = vinyls[11].Id, Value = 5 }, // We Are
            new() { UserId = adminId, VinylId = vinyls[12].Id, Value = 2 }, // Thriller
            new() { UserId = adminId, VinylId = vinyls[13].Id, Value = 4 }, // Purple Rain
            new() { UserId = adminId, VinylId = vinyls[14].Id, Value = 5 }, // Bad
            new() { UserId = adminId, VinylId = vinyls[27].Id, Value = 5 }, // Miseducation of Lauryn Hill
            new() { UserId = adminId, VinylId = vinyls[29].Id, Value = 3 }, // Illmatic
            new() { UserId = adminId, VinylId = vinyls[30].Id, Value = 3 }, // Wu-Tang
            new() { UserId = adminId, VinylId = vinyls[38].Id, Value = 2 }, // Homework
            new() { UserId = adminId, VinylId = vinyls[39].Id, Value = 4 }, // Music Has the Right to Children
            new() { UserId = adminId, VinylId = vinyls[40].Id, Value = 2 }, // Suddenly
        };

        db.Ratings.AddRange(ratings);
        await db.SaveChangesAsync();
    }
}