import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Vinyl } from '../../../shared/models/vinyl-model';

@Component({
  selector: 'app-vinyl-admin-card',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './vinyl-admin-card.html',
  styleUrl: './vinyl-admin-card.scss',
})
export class VinylAdminCard {
  // Recibe el vinilo como input desde el componente padre
  vinyl = input.required<Vinyl>();
}
