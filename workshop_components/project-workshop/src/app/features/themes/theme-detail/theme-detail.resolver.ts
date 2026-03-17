// theme-detail.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { ThemeService } from '../../../core/services/theme-service/theme-service';
import { Theme } from '../../../shared/interfaces/theme';

export const themeDetailResolver: ResolveFn<Theme | null> = (route, state) => {
  const themeService = inject(ThemeService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    router.navigate(['/themes']);
    return EMPTY; // prevents route activation
  }

  return themeService.getThemeById(id).pipe(
    catchError((err) => {
      console.error('Resolver error:', err);
      // Option 1: Redirect to themes list
      router.navigate(['/themes']);
      // Option 2: return null and handle in component
      // return of(null);
      return EMPTY; // stops navigation
    })
  );
};