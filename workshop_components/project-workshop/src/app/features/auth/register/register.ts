// src/app/features/auth/register/register.ts
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../core/services/auth-service/auth-service';
import { UserService } from '../../../core/services/user-service/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  email = '';
  password = '';
  rePassword = '';
  tel = '';
  errorMessage = '';

  async onRegister(): Promise<void> {
    if (!this.username || !this.email || !this.password || !this.rePassword) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    if (this.password !== this.rePassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    try {
      const newUser = await firstValueFrom(this.userService.register({
        username: this.username,
        email: this.email,
        password: this.password,
        tel: this.tel
      }));

      if (newUser) {
        this.authService.setSession(newUser);
        this.router.navigate(['/themes']);
      } else {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    } catch (error) {
      this.errorMessage = 'Registration failed. Please try again.';
      console.error('Registration error:', error);
    }
  }
}
