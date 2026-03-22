// src/app/features/auth/register/register.ts
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../../../core/services/auth-service/auth-service';
import { UserService } from '../../../core/services/user-service/user';
import { MatchPasswordDirective } from './match-password.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, MatchPasswordDirective],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
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

  async onRegister(form: NgForm): Promise<void> {
    if (form.invalid) return;

    try {
      const newUser = await firstValueFrom(
        this.userService.register({
          username: this.username,
          email: this.email,
          password: this.password,
          tel: this.tel,
        })
      );

      if (newUser) {
        this.authService.setSession(newUser);
        await this.router.navigate(['/themes']);
      } else {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    } catch (error) {
      this.errorMessage = 'Registration failed. Please try again.';
      console.error('Registration error:', error);
    }
  }
}
