import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardFooter } from '@angular/material/card';
import { AuthService } from '../../../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatCardFooter],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  error = signal<string | null>(null);
  loginForm: FormGroup;

  email = "";
  password = "";

  hidePassword = true; // Control para mostrar/ocultar contraseña

  // Validación de formulario en el constructor
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const { error } = await this.auth.signIn(email, password);
      if (error) { this.error.set(error.message); } else { this.router.navigate(["/"]) };
    }
  }
}
