import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-vinyl-card',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './vinyl-card.html',
  styleUrl: './vinyl-card.scss',
})


export class VinylCard {
  // Recibe el vinilo como input desde el componente padre
  vinyl = input.required<Vinyl>();
}
// Define la interfaz Vinyl para tipar los datos que recibirá el componente
export interface Vinyl {
  id: number;
  title: string;
  artist: string;
  image_url: string;
  description: string;
  price: number;
}

