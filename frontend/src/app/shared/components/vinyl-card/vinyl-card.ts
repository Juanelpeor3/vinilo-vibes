import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from "@angular/router";
import { Vinyl } from '../../models/vinyl-model';

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
