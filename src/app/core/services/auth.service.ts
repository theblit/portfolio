import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../../../environments/environments';
import { AuthResponse, User } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login/`, { email, password })
      .pipe(
        tap((res) => {
          if (this.isBrowser) {
            localStorage.setItem('access_token', res.access);
            localStorage.setItem('refresh_token', res.refresh);
            localStorage.setItem('user', JSON.stringify(res.user));
          }
        })
      );
  }

  register(
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    passwordConfirm: string
  ): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/register/`, {
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      password,
      password_confirm: passwordConfirm,
    });
  }

  logout(): Observable<unknown> {
    const refresh = this.isBrowser ? localStorage.getItem('refresh_token') : null;
    return this.http.post(`${this.baseUrl}/logout/`, { refresh }).pipe(
      tap(() => {
        this.clearSession();
        this.router.navigate(['/login']);
      })
    );
  }

  refreshToken(refresh: string): Observable<{ access: string; refresh?: string }> {
    return this.http.post<{ access: string; refresh?: string }>(
      `${this.baseUrl}/token/refresh/`,
      { refresh }
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile/`);
  }

  isLoggedIn(): boolean {
    return this.isBrowser && !!localStorage.getItem('access_token');
  }

  getCurrentUser(): User | null {
    if (!this.isBrowser) {
      return null;
    }
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  resetPassword(email: string): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/reset-password/`, { email });
  }

  clearSession(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
}

