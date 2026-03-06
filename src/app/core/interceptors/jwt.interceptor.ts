import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';

// Ajoute automatiquement le header Authorization avec le access_token s'il existe (côté navigateur uniquement)
export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    // Sur le serveur (SSR), on ne touche pas à la requête
    return next(req);
  }

  const access = localStorage.getItem('access_token');

  if (access) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${access}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};

