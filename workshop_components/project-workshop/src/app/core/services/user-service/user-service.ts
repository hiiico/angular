import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { User } from '../../../shared/interfaces/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiService = inject(ApiService);

  // Only keep methods that are not handled by AuthService
  // getCurrentUser(): Observable<User | null> {
  //   return this.apiService.getCurrentUser();
  // }
  //
  // getUserById(id: string): Observable<User> {
  //   return this.apiService.getUserById(id);
  // }

  // If any other user‑specific endpoints exist, add them here.
}
