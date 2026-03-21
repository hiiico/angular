import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import { Theme } from '../../interfaces/theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private apiUrl = 'http://localhost:3000/api';

  // --- State management ---
  private themesSubject = new BehaviorSubject<Theme[]>([]);
  public themes$: Observable<Theme[]> = this.themesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$: Observable<string | null> = this.errorSubject.asObservable();

  // Simple in-memory cache for individual themes
  private themeCache = new Map<string, Theme>();

  // Flag to indicate whether themes have been successfully loaded at least once
  private loaded = false;

  constructor(private http: HttpClient) {}

  /**
   * Loads the list of themes from the API, but only if not already loaded.
   * This prevents unnecessary duplicate requests.
   */
  public loadThemes(): void {
    // 1. If already loaded OR currently loading, do nothing
    if (this.loaded || this.loadingSubject.getValue()) {
      return;
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null); // clear any previous error

    this.http
      .get<Theme[]>(`${this.apiUrl}/themes`)
      .pipe(
        map((themes) => themes.sort((a, b) => b.subscribers.length - a.subscribers.length)),
        tap((themes) => {
          // Success! Mark as loaded and prime the cache
          this.loaded = true;
          themes.forEach((theme) => this.themeCache.set(theme._id, theme));
        }),
        catchError((err) => {
          this.errorSubject.next('Failed to load themes. Please try again later.');
          console.error('Error loading themes:', err);
          return of([]); // return empty array so the stream continues
        }),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe((sortedThemes) => {
        this.themesSubject.next(sortedThemes);
      });
  }

  /**
   * Force a refresh: reset the loaded flag, clear the cache, and load again.
   */
  public refreshThemes(): void {
    this.loaded = false;
    this.themeCache.clear();
    this.loadThemes();
  }

  /**
   * Fetches a single theme by ID.
   * First checks the cache; if not found, makes an HTTP request and caches the result.
   */
  public getThemeById(id: string): Observable<Theme> {
    // Check cache
    const cached = this.themeCache.get(id);
    if (cached) {
      console.log('Returning cached theme', id);
      return of(cached);
    }

    // Not in cache – fetch from API
    console.log('Fetching theme from API', id);
    return this.http.get<Theme>(`${this.apiUrl}/themes/${id}`).pipe(
      tap((theme) => {
        console.log('Received theme', id, theme);
        this.themeCache.set(id, theme);
      }),
      catchError((err) => {
        console.error(`Error fetching theme ${id}:`, err);
        throw new Error('Failed to load theme. Please try again.');
      }),
    );
  }

  /**
   * Optional initialization method – can be called by APP_INITIALIZER or root component.
   */
  public initialize(): void {
    this.loadThemes();
  }
}
