import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-modal',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.scss',
})
export class EditModal {
  readonly dialogRef = inject(MatDialogRef<EditModal>);
  readonly data = inject(MAT_DIALOG_DATA)
  editVinylForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editVinylForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      imageUrl: [''],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      genreId: [null, Validators.required],
      stock: [0, Validators.required]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.editVinylForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}