import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { inject } from '@angular/core';

/**
 * Guard de autenticación para proteger rutas.
 *
 * @remarks
 * Este guard verifica si existe una sesión activa usando AuthService.
 * Si el usuario no está autenticado, redirige a la ruta de login.
 *
 * @returns `true` si el usuario está autenticado.
 * @returns Un link que redirige a `/auth/login` si no hay sesión activa.
 *
 * @example
 * ```ts
 * {
 *  path: "profile",
 *  component: Profile,
 *  title: "Profile | Vinilo Vibes",
 *  canActivate: [authGuard]
 * }
 * ```
 */

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.checkAuth();

  if (!isAuthenticated.data.session) {
    return router.parseUrl('/auth/login');
  }

  return true;
};