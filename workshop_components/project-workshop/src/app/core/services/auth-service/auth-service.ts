// src/app/core/services/auth-service/auth-service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { User } from '../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private user = signal<User | null>(null);

  isLoggedIn = computed(() => this.user() !== null);
  currentUser = computed(() => this.user());

  constructor() {
    this.checkAuth();
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const user = await firstValueFrom(this.apiService.login(username, password));
      if (user) {
        this.user.set(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async register(userData: any): Promise<boolean> {
    try {
      const user = await firstValueFrom(this.apiService.register(userData));
      if (user) {
        this.user.set(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.apiService.logout());
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.user.set(null);
      this.router.navigate(['/login']);
    }
  }

  setSession(user: User): void {
    this.user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  checkAuth(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.user.set(user);
      } catch {
        this.user.set(null);
      }
    }
  }

  getCurrentUserId(): string | null {
    return this.currentUser()?._id || null;
  }

  getCurrentUsername(): string {
    return this.currentUser()?.username || 'Guest';
  }
}
