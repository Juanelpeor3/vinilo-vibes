// Define la interfaz Vinyl para tipar los datos del vinilo
export interface Vinyl {
    id: number;
    title: string;
    artist: string;
    image_url: string;
    description: string;
    price: number;
    genre_id: number;
    stock: number;
}
