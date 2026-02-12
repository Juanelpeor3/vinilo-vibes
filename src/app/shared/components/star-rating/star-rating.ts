import { Component, Input } from '@angular/core';
import { Rating } from '../../models/rating-model';
import { MatIcon, MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-star-rating',
  imports: [MatIconModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {
  @Input() ratings: Rating[] | undefined = []; // Recibimos el array de ratings de Supabase

  average: number = 0;
  count: number = 0;

  ngOnChanges() {
    this.calculateRating();
  }

  private calculateRating() {
    if (!this.ratings || this.ratings.length === 0) {
      this.average = 0;
      this.count = 0;
      return;
    }

    // Calcular el promedio
    // Sumar todas las valoraciones y dividir por el número de valoraciones
    const total = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    this.average = total / this.ratings.length;
    this.count = this.ratings.length;
  }
}
