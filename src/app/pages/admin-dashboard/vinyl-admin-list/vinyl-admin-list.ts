import { Component, inject, signal } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { VinylCard } from "../../../shared/components/vinyl-card/vinyl-card";
import { CommonModule } from '@angular/common';
import { VinylService } from '../../../services/vinyl/vinyl';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Vinyl } from '../../../shared/models/vinyl-model';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-vinyl-admin-list',
  imports: [CommonModule, MatProgressSpinner, VinylCard, MatIcon],
  templateUrl: './vinyl-admin-list.html',
  styleUrl: './vinyl-admin-list.scss',
})
export class VinylAdminList {
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

    this.vinyls.set(await this.vinylService.getAll());
    this.isLoading.set(false);
    this.currentName.set("Todos los Vinilos disponibles:");

  }
}
