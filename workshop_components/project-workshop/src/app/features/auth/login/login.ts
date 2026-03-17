import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  onLogin(): void {
    const sucess = this.authService.login(this.email, this.password);
    if (sucess) {
      this.router.navigate(['/themes']);
    } else {
      alert('Invalid credentials!');
    }
  }
}
