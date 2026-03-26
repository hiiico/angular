// src/app/core/interceptors/auth.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service/auth-service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Check for 401 (Unauthorized) or 403 with blacklisted token
      if (error.status === 401 || (error.status === 403 && error.error?.message === 'blacklisted token')) {
        if (authService.isLoggedIn()) {
          // Skip API call to avoid infinite loop, redirect to login
          authService.logout('/login', true).catch(err => console.warn('Logout error in interceptor', err));
        } else {
          // Just navigate if not logged in
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};
