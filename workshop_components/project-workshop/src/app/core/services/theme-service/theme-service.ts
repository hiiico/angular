// src/app/core/services/theme-service/theme-service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, shareReplay, catchError } from 'rxjs/operators';
import { Theme } from '../../../shared/interfaces/theme';
import { ApiService } from '../api-service/api.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themesCache$: Observable<Theme[]> | null = null;

  constructor(private apiService: ApiService) {}

  getThemes(): Observable<Theme[]> {
    if (!this.themesCache$) {
      this.themesCache$ = this.apiService.getThemes().pipe(
        tap(themes => console.log('Themes received:', themes.length)),
        shareReplay(1)
      );
    }
    return this.themesCache$;
  }

  getThemeById(themeId: string): Observable<Theme | null> {
    return this.apiService.getThemeById(themeId).pipe(
      catchError(err => {
        console.error('Error getting theme by ID:', err);
        return of(null);
      })
    );
  }

  createTheme(themeName: string, postText: string): Observable<Theme> {
    return this.apiService.createTheme(themeName, postText).pipe(
      tap(() => this.themesCache$ = null)
    );
  }
}
