import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VinylCard } from '../../shared/components/vinyl-card/vinyl-card';
import { VinylService } from '../../services/vinyl/vinyl';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Vinyl } from '../../shared/models/vinyl-model';
import { PageNotFound } from "../page-not-found/page-not-found";

@Component({
  selector: 'app-vinyl-list',
  imports: [CommonModule, VinylCard, MatProgressSpinnerModule, PageNotFound],
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
  notFound = signal(false);

  currentName = signal<string>("");
  async ngOnInit() {
    const genreId = this.route.snapshot.paramMap.get('genreId');
    // Si hay un genreId, obtenemos los vinilos de ese género específico, de lo contrario, obtenemos todos los vinilos
    if (genreId) {
      if (genreId && !this.genre_names[genreId]) {
        this.notFound.set(true); // O a una página de error
        return;
      }
      // Con el genreId, obtenemos los vinilos de ese género específico
      this.titleService.setTitle(`${this.genre_names[genreId]} | Vinilo Vibes`);
      this.currentName.set(`Vinilos de ${this.genre_names[genreId]}:`);

      this.vinyls.set(await this.vinylService.getByGenreId(genreId));
      this.isLoading.set(false);
    }
    else {
      this.vinyls.set(await this.vinylService.getAll());
      this.isLoading.set(false);
      this.currentName.set("Todos los Vinilos disponibles:");
    }
  }
}
