import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-modal',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './create-modal.html',
  styleUrl: './create-modal.scss',
})
export class CreateModal {
  readonly dialogRef = inject(MatDialogRef<CreateModal>);
  vinylForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.vinylForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      image_url: [''],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      genre_id: [null, Validators.required],
      stock: [0, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
