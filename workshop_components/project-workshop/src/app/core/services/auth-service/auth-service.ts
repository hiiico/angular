import { Injectable, inject, signal, computed } from '@angular/core';
import { UserService } from '../user-service/user';
import { User } from '../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService = inject(UserService);
  private user = signal<User | null>(null);

  isLoggedIn = computed(() => this.user() !== null);
  currentUser = computed(() => this.user());

  // import data from DB 
  login(email: string, password: string): boolean {
    const isUser = this.userService.validateCredentials(email, password);

    if(isUser) {
      this.user.set(isUser);
      return true;
    }
    return false;
  }

  setSession(user: User): void {
    this.user.set(user);
  }

  logout(): void {
    this.user.set(null);
  }
}
