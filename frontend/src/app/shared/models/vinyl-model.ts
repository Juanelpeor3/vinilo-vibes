export interface Vinyl {
    id: number;
    title: string;
    artist: string;
    imageUrl: string;
    description: string;
    price: number;
    genreId: number;
    genreName: string;
    stock: number;
    releaseYear?: number;
    averageRating?: number;
    ratingCount: number;
}