// src/app/core/services/user-service/user.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UserCredentials } from '../../../shared/interfaces/user';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  register(user: UserCredentials): Observable<User> {
    return this.apiService.register(user).pipe(
      catchError(err => {
        console.error('Registration failed', err);
        throw err;
      })
    );
  }

  validateCredentials(email: string, password: string): Observable<User | null> {
    return this.apiService.validateCredentials(email, password);
  }

  getUserById(id: string): Observable<User | null> {
    return this.apiService.getUserById(id).pipe(
      catchError(() => of(null))
    );
  }

  getCurrentUser(): Observable<User | null> {
    return this.apiService.getCurrentUser();
  }
}
