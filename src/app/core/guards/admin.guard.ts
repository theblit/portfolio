import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/portfolio.models';

// Autorise l'accès si l'utilisateur est connecté et est_verifie = true (côté navigateur)
export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const raw = localStorage.getItem('user');

  if (raw) {
    try {
      const user = JSON.parse(raw) as User;
      if (user.est_verifie) {
        return true;
      }
    } catch {
      // ignore JSON parse error
    }
  }

  router.navigate(['/login']);
  return false;
};

