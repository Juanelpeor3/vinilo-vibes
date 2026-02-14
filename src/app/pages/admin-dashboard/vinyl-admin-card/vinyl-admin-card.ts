import { Component, inject, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { Vinyl } from '../../../shared/models/vinyl-model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModal } from '../delete-modal/delete-modal';
import { VinylService } from '../../../services/vinyl/vinyl';

@Component({
  selector: 'app-vinyl-admin-card',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './vinyl-admin-card.html',
  styleUrl: './vinyl-admin-card.scss',
})
export class VinylAdminCard {
  vinyl = input.required<Vinyl>();

  vinylService = inject(VinylService);
  constructor(private dialog: MatDialog, private router: Router) { }

  // Método para abrir el modal de eliminación
  openDeleteModal(vinyl: Vinyl) {
    const dialogRef = this.dialog.open(DeleteModal, {
      width: '450px',
      data: { id: vinyl.id, title: vinyl.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vinylService.delete(vinyl.id).then(success => {
          if (success) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['dashboard']);
            });
          }
        });
      }
    });
  }
}