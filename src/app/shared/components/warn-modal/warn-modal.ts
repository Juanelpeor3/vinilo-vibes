import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'app-warn-modal',
  imports: [MatDialogModule, MatDialogActions, MatButtonModule],
  templateUrl: './warn-modal.html',
  styleUrl: './warn-modal.scss',
})
export class WarnModal {
  readonly dialogRef = inject(MatDialogRef<WarnModal>);

  readonly data = inject<{ title: string, message: string }>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
