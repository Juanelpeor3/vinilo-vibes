import { Component } from '@angular/core';
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
  registerForm: FormGroup;
  hidePassword = true;

  // Validación de formulario en el constructor
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ["", []],
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

    let { email, password } = this.registerForm.value;
    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
      console.error("Email o contraseña vacíos");
      return;
    }

    try {
      const { error } = await this.auth.signUp(email, password);
      if (error) {
        console.error("Error de registro:", error.message);
        return;
      }
      console.log("Usuario registrado correctamente.");
      this.router.navigate(["/auth/login"]);
    } catch (err) {
      console.error("Error inesperado:", err);
    }
  }
}
