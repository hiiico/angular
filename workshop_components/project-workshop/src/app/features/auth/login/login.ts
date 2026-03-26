import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service/auth-service';
import { InputErrorDirective } from '../../../shared/directives/input-error.directive';
import { emailValidator } from '../../../shared/validators/email.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, InputErrorDirective],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  isLoading = false;
  errorMessage = '';

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    try {
      const success = await this.authService.login(email, password);
      if (success) {
        await this.router.navigate(['/themes']);
      } else {
        this.errorMessage = 'Invalid email or password!';
      }
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Login failed. Try again.';
      console.error('Login error:', err);
    } finally {
      this.isLoading = false;
    }
  }
}
