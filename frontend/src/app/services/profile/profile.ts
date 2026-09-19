import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth';

/**
 * Servicio para la gestión del perfil del usuario y sesión actual.
 * @remarks
 * Este servicio interactúa con AuthService para obtener
 * datos de autenticación y metadatos del usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private authService = inject(AuthService);

  /**
   * Recupera la información detallada del perfil del usuario autenticado.
   * @returns Una promesa con los datos del perfil del usuario.
   */
  async getProfile() {
    const user = this.authService.getUser();
    if (!user) return { data: null, error: 'Not authenticated' };

    return {
      data: {
        id: '',
        name: user.fullName,
        email: user.email,
        role: user.role
      },
      error: null
    };
  }

  /**
   * Finaliza la sesión del usuario actual en el dispositivo.
   */
  signOut() {
    this.authService.signOut();
  }
}