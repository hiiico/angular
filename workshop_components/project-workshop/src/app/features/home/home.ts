import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service/auth-service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProfileComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  authService = inject(AuthService);
}
