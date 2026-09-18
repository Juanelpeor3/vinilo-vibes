import { Component, inject, signal } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CommonModule } from '@angular/common';
import { VinylService } from '../../../services/vinyl/vinyl';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Vinyl } from '../../../shared/models/vinyl-model';
import { MatIcon } from "@angular/material/icon";
import { VinylAdminCard } from "../vinyl-admin-card/vinyl-admin-card";
import { CreateModal } from '../create-modal/create-modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vinyl-admin-list',
  imports: [CommonModule, MatProgressSpinner, MatIcon, VinylAdminCard],
  templateUrl: './vinyl-admin-list.html',
  styleUrl: './vinyl-admin-list.scss',
})
export class VinylAdminList {
  private vinylService = inject(VinylService);
  constructor(private route: ActivatedRoute, private titleService: Title, private dialog: MatDialog) { }

  vinyls = signal<Vinyl[]>([]);
  isLoading = signal(true);
  notFound = signal(false);

  currentName = signal<string>("");

  async ngOnInit() {
    this.vinyls.set(await this.vinylService.getAll());
    this.isLoading.set(false);
    this.currentName.set("Todos los Vinilos disponibles:");
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateModal, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vinylService.create(result).then(createdVinyl => {
          if (createdVinyl) {
            this.vinyls.update(vinyls => [...vinyls, createdVinyl]);
          }
        });
      }
    });
  }
}