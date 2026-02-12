import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vinyl, VinylCard } from '../vinyl-card/vinyl-card';
import { VinylService } from '../../../services/vinyl/vinyl';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vinyl-list',
  imports: [CommonModule, VinylCard, MatProgressSpinnerModule],
  templateUrl: './vinyl-list.html',
  styleUrl: './vinyl-list.scss',
})
export class VinylList {
  private vinylService = inject(VinylService);

  vinyls = signal<Vinyl[]>([]);
  isLoading = signal(true);

  async ngOnInit() {
    this.vinyls.set(await this.vinylService.getAll());
    this.isLoading.set(false);
  }
}
