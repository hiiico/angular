import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../../core/services/auth-service/auth-service';
import {MatchPasswordDirective} from './directives/match-password.directive';
import {FormInputComponent} from './form-input/form-input.component';
import {PhoneInputComponent} from './phone-input/phone-input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, MatchPasswordDirective, FormInputComponent, PhoneInputComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
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
      await this.authService.register({
        username: this.username,
        email: this.email,
        password: this.password,
        tel: this.tel,
      });
      await this.router.navigate(['/themes']);
    } catch (error: any) {
      this.errorMessage = error?.error?.message || error?.message || 'Registration failed. Please try again.';
      console.error('Registration error:', error);
    }
  }
}
