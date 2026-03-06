import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Autorise l'accès uniquement si un access_token est présent (côté navigateur)
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const access = localStorage.getItem('access_token');

  if (access) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

