import { Component, computed, input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-star-rating',
  imports: [MatIconModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {
  averageRating = input<number | null>(null);
  ratingCount = input<number>(0);

  displayRating = computed(() => {
    const avg = this.averageRating();
    return avg !== null ? avg : 0;
  });
}