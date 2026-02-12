import { Component, inject, signal } from '@angular/core';
import { VinylService } from '../../services/vinyl/vinyl';
import { Vinyl } from '../../shared/components/vinyl-card/vinyl-card';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PageNotFound } from "../page-not-found/page-not-found";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-vinyl-details',
  imports: [PageNotFound, MatProgressSpinner],
  templateUrl: './vinyl-details.html',
  styleUrl: './vinyl-details.scss',
})
export class VinylDetails {
  private vinylService = inject(VinylService);
  constructor(private route: ActivatedRoute, private titleService: Title) { }

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