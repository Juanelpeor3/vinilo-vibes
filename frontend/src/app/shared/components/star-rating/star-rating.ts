import { Component, computed, input, Input } from '@angular/core';
import { Rating } from '../../models/rating-model';
import { MatIcon, MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-star-rating',
  imports: [MatIconModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {
  ratings = input<Rating[]>([]);

  // Solo si ratings cambia
  average = computed(() => {
    const list = this.ratings();
    if (list.length === 0) return 0;

    const total = list.reduce((acc, curr) => acc + curr.rating, 0);
    return total / list.length;
  });

  count = computed(() => this.ratings().length);
}
