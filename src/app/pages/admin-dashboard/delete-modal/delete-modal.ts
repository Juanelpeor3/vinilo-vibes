import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-delete-modal',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.scss',
})
export class DeleteModal {
  readonly dialogRef = inject(MatDialogRef<DeleteModal>);
  deleteVinylForm: FormGroup;
  // Inyectamos los datos del vinilo a eliminar
  readonly data = inject<{ id: number, title: string }>(MAT_DIALOG_DATA);

  constructor(private fb: FormBuilder) {
    this.deleteVinylForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(`^${this.data.title}$`)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
