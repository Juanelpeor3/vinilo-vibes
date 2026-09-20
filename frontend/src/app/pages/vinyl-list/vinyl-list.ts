import { Component, inject, signal, OnDestroy } from '@angular/core';
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
export class VinylList implements OnDestroy {
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
  isSlow = signal(false);
  notFound = signal(false);
  currentName = signal<string>("");
  private slowTimer: ReturnType<typeof setTimeout> | null = null;

  private startSlowTimer() {
    this.isSlow.set(false);
    this.slowTimer = setTimeout(() => this.isSlow.set(true), 3000);
  }

  private stopSlowTimer() {
    if (this.slowTimer) clearTimeout(this.slowTimer);
    this.isSlow.set(false);
  }

  ngOnInit() {
    this.startSlowTimer();
    const genreId = this.route.snapshot.paramMap.get('genreId');

    if (genreId) {
      if (!this.genre_names[genreId]) {
        this.notFound.set(true);
        this.stopSlowTimer();
        return;
      }
      this.titleService.setTitle(`${this.genre_names[genreId]} | Vinilo Vibes`);
      this.currentName.set(`Vinilos de ${this.genre_names[genreId]}:`);
      this.vinylService.getByGenreId(genreId).then(data => {
        this.vinyls.set(data);
        this.isLoading.set(false);
        this.stopSlowTimer();
      });
    } else {
      // Reacciona a cambios en el query param ?q= (búsquedas sucesivas sin recargar)
      this.route.queryParamMap.subscribe(async params => {
        this.isLoading.set(true);
        this.startSlowTimer();
        const q = params.get('q');
        if (q) {
          this.titleService.setTitle(`"${q}" | Vinilo Vibes`);
          this.currentName.set(`Resultados para "${q}":`);
          this.vinyls.set(await this.vinylService.search(q));
        } else {
          this.titleService.setTitle('Vinilo Vibes');
          this.currentName.set('Todos los Vinilos disponibles:');
          this.vinyls.set(await this.vinylService.getAll());
        }
        this.isLoading.set(false);
        this.stopSlowTimer();
      });
    }
  }

  ngOnDestroy() {
    if (this.slowTimer) clearTimeout(this.slowTimer);
  }
}