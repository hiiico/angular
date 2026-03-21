import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, shareReplay, catchError } from 'rxjs/operators';
import { Theme } from '../../../shared/interfaces/theme'; 
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private apiUrl = 'http://localhost:3000/api'; // adjust to your API
  private themesCache$?: Observable<Theme[]>;

  constructor(private http: HttpClient) {}

 getThemes(): Observable<Theme[]> {
  if (!this.themesCache$) {
    this.themesCache$ = this.http.get<Theme[]>(`${this.apiUrl}/themes`).pipe(
      tap(themes => console.log('Themes received:', themes)),
      shareReplay(1)
    );
  }
  return this.themesCache$;
}

  getThemeById(themeId: string): Observable<Theme | null> {
    return this.getThemes().pipe(
      map(themes => themes.find(theme => theme._id === themeId) ?? null)
    );
  }
}