import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User, UserCredentials } from '../../../shared/interfaces/user';
import {CreateThemeRequest, Theme} from '../../../shared/interfaces/theme';
import { Post } from '../../../shared/interfaces/post';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  // All authenticated requests must include credentials (cookies)
  private httpOptions = { withCredentials: true };

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
    return this.http.post<User>(`${this.apiUrl}/register`, payload, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // ========== Profile ==========
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/profile`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateProfile(profile: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/profile`, profile, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // ========== Themes ==========
  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}/themes`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getThemeById(id: string): Observable<Theme> {
    return this.http.get<Theme>(`${this.apiUrl}/themes/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  createTheme(data: CreateThemeRequest): Observable<Theme> {
    return this.http.post<Theme>(`${this.apiUrl}/themes`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateThemeSubscribers(themeId: string, subscribers: string[]): Observable<Theme> {
    return this.http.put<Theme>(`${this.apiUrl}/themes/${themeId}`, { subscribers }, this.httpOptions).pipe(
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
    return this.http.get<Post[]>(`${this.apiUrl}/posts?limit=${limit}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  createPost(themeId: string, postText: string): Observable<Theme> {
    return this.http.post<Theme>(`${this.apiUrl}/themes/${themeId}`, { postText }, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  likePost(postId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/likes/${postId}`, {}, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
