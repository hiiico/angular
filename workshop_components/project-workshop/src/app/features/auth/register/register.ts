import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service/auth-service';
import { User, UserCredentials } from '../../../shared/interfaces/user';
import { UserService } from '../../../core/services/user-service/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  username = '';
  email = '';
  tel = '';
  password = '';
  rePassword = '';

  onRegister(): void {
    if (!this.email) {
      alert('Email is required!');
      return;
    }

    if (!this.password) {
      alert('Password is required!');
      return;
    }

    if (this.password !== this.rePassword) {
      alert("Password don't match!");
      return;
    }

    const newUser: UserCredentials = {
      _id: this.generateId(),
      username: this.username,
      email: this.email,
      tel: '+359' + this.tel,
      password: this.password,
    };

    const userSession = this.userService.register(newUser);
    this.authService.setSession(userSession);
    this.router.navigate(['/themes']);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
