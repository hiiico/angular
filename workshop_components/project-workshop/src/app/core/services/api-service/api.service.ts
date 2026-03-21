// src/app/core/services/api-service/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Theme } from '../../../shared/interfaces/theme';
import { Post } from '../../../shared/interfaces/post';
import { User, UserCredentials } from '../../../shared/interfaces/user';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || `Error ${error.status}: ${error.message}`;
    console.error('API error:', error);
    return throwError(() => new Error(message));
  }

  // ========== Auth ==========
  register(user: UserCredentials): Observable<User> {
    const payload = {
      username: user.username,
      email: user.email,
      password: user.password,
      rePassword: user.password,
      tel: user.tel
    };
    return this.http.post<User>(`${this.apiUrl}/register`, payload).pipe(
      tap(u => localStorage.setItem('user', JSON.stringify(u))),
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => localStorage.setItem('user', JSON.stringify(user))),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.getAuthHeaders() }).pipe(
      tap(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }),
      catchError(this.handleError)
    );
  }

  // ========== Themes ==========
  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}/themes`).pipe(
      catchError(this.handleError)
    );
  }

  getThemeById(id: string): Observable<Theme> {
    return this.http.get<Theme>(`${this.apiUrl}/themes/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createTheme(themeName: string, postText: string): Observable<Theme> {
    return this.http.post<Theme>(`${this.apiUrl}/themes`, { themeName, postText }, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // ========== Posts ==========
  getPostsByThemeId(themeId: string): Observable<Post[]> {
    return this.getThemeById(themeId).pipe(
      map(theme => (theme as any).posts || [])
    );
  }

  getLatestPosts(limit: number = 5): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts?limit=${limit}`).pipe(
      catchError(this.handleError)
    );
  }

  createPost(themeId: string, postText: string): Observable<Theme> {
    return this.http.post<Theme>(`${this.apiUrl}/themes/${themeId}`, { postText }, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  likePost(postId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/likes/${postId}`, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // ========== Users ==========
  getCurrentUser(): Observable<User | null> {
    const stored = localStorage.getItem('user');
    if (stored) return of(JSON.parse(stored));
    return of(null);
  }

  // Compatibility with old code (if needed)
  getUserById(id: string): Observable<User> {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user._id === id) return of(user);
    }
    return throwError(() => new Error('User not found'));
  }

  validateCredentials(username: string, password: string): Observable<User | null> {
    return this.login(username, password).pipe(catchError(() => of(null)));
  }
}
