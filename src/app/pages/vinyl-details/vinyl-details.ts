import { Component, inject, signal } from '@angular/core';
import { VinylService } from '../../services/vinyl/vinyl';
import { Vinyl } from '../../shared/models/vinyl-model';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PageNotFound } from "../page-not-found/page-not-found";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { StarRating } from "../../shared/components/star-rating/star-rating";
import { StockData } from "../../shared/components/stock-data/stock-data";

@Component({
  selector: 'app-vinyl-details',
  imports: [PageNotFound, MatProgressSpinner, StarRating, StockData],
  templateUrl: './vinyl-details.html',
  styleUrl: './vinyl-details.scss',
})
export class VinylDetails {
  private vinylService = inject(VinylService);
  constructor(private route: ActivatedRoute, private titleService: Title) { }

  genre_names: Record<string, string> = {
    '1': 'Rock',
    '2': 'Jazz',
    '3': 'Pop',
    '4': 'Hiphop',
    '5': 'Electrónica'
  };

  vinyl = signal<Vinyl | null>(null);
  isLoading = signal(true);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        const data = await this.vinylService.getById(id);
        this.vinyl.set(data);
        const title = data?.title

        // Crear título dinámico
        this.titleService.setTitle(`${title} | Vinilo Vibes`)
      } catch (error) {
        this.vinyl.set(null);
      } finally {
        this.isLoading.set(false);
      }
    } else {
      this.isLoading.set(false);
    }
  }
}