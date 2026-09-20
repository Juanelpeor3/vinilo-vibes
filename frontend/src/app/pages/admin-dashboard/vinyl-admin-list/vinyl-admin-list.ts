import { Component, inject, signal, OnDestroy } from '@angular/core';
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
export class VinylAdminList implements OnDestroy {
  private vinylService = inject(VinylService);
  constructor(private route: ActivatedRoute, private titleService: Title, private dialog: MatDialog) { }

  vinyls = signal<Vinyl[]>([]);
  isLoading = signal(true);
  isSlow = signal(false);
  notFound = signal(false);
  private slowTimer: ReturnType<typeof setTimeout> | null = null;

  currentName = signal<string>("");

  async ngOnInit() {
    this.slowTimer = setTimeout(() => this.isSlow.set(true), 3000);
    this.vinyls.set(await this.vinylService.getAll());
    this.isLoading.set(false);
    if (this.slowTimer) clearTimeout(this.slowTimer);
    this.isSlow.set(false);
    this.currentName.set("Todos los Vinilos disponibles:");
  }

  ngOnDestroy() {
    if (this.slowTimer) clearTimeout(this.slowTimer);
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