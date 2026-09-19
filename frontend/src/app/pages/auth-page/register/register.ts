import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  error = signal<string | null>(null);
  registerForm: FormGroup;
  hidePassword = true;

  // Validación de formulario en el constructor
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  // Validator personalizado para confirmar que las contraseñas coinciden
  passwordsMatch(group: FormGroup) {
    const password = group.get("password")?.value;
    const confirm = group.get("confirmPassword")?.value;
    return password === confirm ? null : { notMatching: true };
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    let { name, email, password } = this.registerForm.value;
    email = email?.trim();
    password = password?.trim();
    name = name?.trim();

    if (!email || !password || !name) {
      this.error.set("Todos los campos son obligatorios");
      return;
    }

    try {
      await this.auth.signUp(email, password, name);
      this.error.set(null);
      this.router.navigate(["/auth/login"]);
    } catch (err: any) {
      this.error.set(err?.error?.message ?? err?.message ?? "Error al registrar usuario");
    }
  }
}