import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

/**
 * Guard de autorización basado en roles.
 *
 * @remarks
 * Este guard verifica si el usuario autenticado posee alguno de los roles
 * definidos en la propiedad `data.roles` de la configuración de la ruta.
 *
 * Utiliza AuthService para obtener el rol actual del usuario y
 * Router para redirigir en caso de acceso no autorizado.
 * 
 *
 * @param route - Información de la ruta que se intenta activar.
 * @param state - Estado actual del router al momento de la navegación.
 *
 * @returns `true` si el usuario tiene uno de los roles permitidos.
 * @returns Un {@link UrlTree} que redirige a la ruta raíz ('/')
 * si el usuario no tiene permisos.
 *
 * @example
 * ```ts
 * {
 *  path: "dashboard",
 *  component: AdminDashboard,
 *  title: "Vinilo Vibes",
 *  canActivate: [authGuard, roleGuard],
 *  data: { roles: ['admin'] }
 * }
 * ```
 *
 * @throws Puede fallar si la propiedad `data.roles` no está definida en la ruta.
 */

export const roleGuard: CanActivateFn = async (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = await authService.getUserRole();
  const expectedRoles = route.data['roles'] as Array<string>;

  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  return router.parseUrl('/');
};
