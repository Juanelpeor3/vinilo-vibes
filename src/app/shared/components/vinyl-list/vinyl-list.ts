import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VinylCard } from '../vinyl-card/vinyl-card';
import { VinylService } from '../../../services/vinyl/vinyl';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Vinyl } from '../../models/vinyl-model';

@Component({
  selector: 'app-vinyl-list',
  imports: [CommonModule, VinylCard, MatProgressSpinnerModule],
  templateUrl: './vinyl-list.html',
  styleUrl: './vinyl-list.scss',
})
export class VinylList {
  private vinylService = inject(VinylService);
  constructor(private route: ActivatedRoute, private titleService: Title) { }

  genre_names: Record<string, string> = {
    '1': 'Rock',
    '2': 'Jazz',
    '3': 'Pop',
    '4': 'Hiphop',
    '5': 'Electrónica'
  };

  vinyls = signal<Vinyl[]>([]);
  isLoading = signal(true);
  currentName = signal<string>("Todos los Vinilos disponibles:");

  async ngOnInit() {
    const genreId = this.route.snapshot.paramMap.get('genreId');
    // Si hay un genreId, obtenemos los vinilos de ese género específico, de lo contrario, obtenemos todos los vinilos
    if (genreId) {
      // Con el genreId, obtenemos los vinilos de ese género específico
      this.titleService.setTitle(`${this.genre_names[genreId]} | Vinilo Vibes`);
      this.currentName.set(`Vinilos de ${this.genre_names[genreId]}:`);

      this.vinyls.set(await this.vinylService.getByGenreId(genreId));
      this.isLoading.set(false);
    }
    else {
      this.vinyls.set(await this.vinylService.getAll());
      this.isLoading.set(false);
    }
  }
}
