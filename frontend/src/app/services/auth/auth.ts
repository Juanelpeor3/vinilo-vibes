import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
  role: string;
}

/**
 * Servicio de autenticación de la aplicación.
 *
 * @remarks
 * Encapsula todas las operaciones relacionadas con autenticación
 * usando la API REST del backend.
 *
 * Este servicio maneja:
 * - Registro de usuarios
 * - Inicio y cierre de sesión
 * - Gestión del token JWT en localStorage
 * - Obtención del rol del usuario
 *
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  /**
   * Inicia sesión con email y contraseña.
   *
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Promesa con el resultado de autenticación.
   *
   */
  async signIn(email: string, password: string): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
    );
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response));
    return response;
  }

  /**
   * Registra un nuevo usuario con email, contraseña y nombre.
   *
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @param fullName - Nombre completo del usuario.
   * @param role - Rol del usuario (por defecto 'user').
   * @returns Promesa con la respuesta de registro.
   *
   */
  async signUp(email: string, password: string, fullName: string, role: string = 'user'): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/register`, { email, password, fullName, role })
    );
    return response;
  }

  /**
   * Cierra la sesión actual del usuario.
   */
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Obtiene el token JWT almacenado.
   *
   * @returns El token JWT o `null` si no existe.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Verifica si existe una sesión activa.
   *
   * @returns `true` si hay un token almacenado.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtiene el usuario autenticado actualmente.
   *
   * @returns El objeto usuario o `null` si no hay sesión activa.
   */
  getUser(): AuthResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Obtiene el rol del usuario autenticado.
   *
   * @returns El rol del usuario (`admin`, `user`)
   * o `null` si no está autenticado.
   */
  getUserRole(): string | null {
    const user = this.getUser();
    return user?.role ?? null;
  }
}