import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let isAuthenticated = false;
  authService.isAuthenticated$.subscribe((value) => (isAuthenticated = value));
  if (isAuthenticated) {
    return true;
  }

  return router.parseUrl('/login');
};
