import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

export const roleGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = await authService.getUserRole();

  // 'roles' es el nombre de la propiedad que tenemos en el archivo de rutas
  const expectedRoles = route.data['roles'] as Array<string>;

  // Verificamos si el usuario tiene un rol y si ese rol está incluido en la lista de roles permitidos
  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  // Si no tiene el rol lo redirigimos
  return router.parseUrl('/');
};
