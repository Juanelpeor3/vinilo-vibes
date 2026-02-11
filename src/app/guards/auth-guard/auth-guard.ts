import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.checkAuth();

  if (!isAuthenticated.data.session) {
    return router.parseUrl('/auth/login');
  }

  return true;
};