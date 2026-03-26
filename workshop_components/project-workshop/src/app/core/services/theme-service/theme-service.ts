// src/app/core/services/theme-service/theme-service.ts
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { tap, shareReplay, catchError } from 'rxjs/operators';
import { Theme } from '../../../shared/interfaces/theme';
import { CreateThemeRequest } from '../../../shared/interfaces/theme';
import { ApiService } from '../api-service/api.service';
import { AuthService } from '../auth-service/auth-service';
import {ProfileService} from '../profile-service/profile.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themesCache$: Observable<Theme[]> | null = null;
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private profileService = inject((ProfileService));

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

  createTheme(data: CreateThemeRequest): Observable<Theme> {
    return this.apiService.createTheme(data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  async subscribe(themeId: string): Promise<Theme> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) throw new Error('Not authenticated');

    const theme = await firstValueFrom(this.getThemeById(themeId));
    if (!theme) throw new Error('Theme not found');

    const subscriberIds = (theme.subscribers || []).map(sub => this.extractUserId(sub));
    if (!subscriberIds.includes(userId)) {
      const updatedSubscribers = [...subscriberIds, userId];
      const result = await firstValueFrom(
        this.apiService.updateThemeSubscribers(themeId, updatedSubscribers)
      );
      const updatedUser = await this.profileService.addThemeToUser(themeId);
      this.authService.setSession(updatedUser);
      this.invalidateCache();
      return result;
    }
    return theme;
  }

  async unsubscribe(themeId: string): Promise<Theme> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) throw new Error('Not authenticated');

    const theme = await firstValueFrom(this.getThemeById(themeId));
    if (!theme) throw new Error('Theme not found');

    const subscriberIds = (theme.subscribers || []).map(sub => this.extractUserId(sub));
    if (subscriberIds.includes(userId)) {
      const updatedSubscribers = subscriberIds.filter(id => id !== userId);
      const result = await firstValueFrom(
        this.apiService.updateThemeSubscribers(themeId, updatedSubscribers)
      );
      const updatedUser = await this.profileService.removeThemeFromUser(themeId);
      this.authService.setSession(updatedUser);
      this.invalidateCache();
      return result;
    }
    return theme;
  }

  private extractUserId(subscriber: any): string {
    if (typeof subscriber === 'string') return subscriber;
    if (subscriber && typeof subscriber === 'object' && '$oid' in subscriber) {
      return subscriber.$oid;
    }
    return '';
  }

  invalidateCache(): void {
    this.themesCache$ = null;
  }
}
