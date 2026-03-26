import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-mini-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mini-bar.html',
  styleUrl: './mini-bar.css',
})
export class MiniBar {
  private authService = inject(AuthService);
  private router = inject(Router);
  isLoggedIn = this.authService.isLoggedIn;
                            // get currentUser if exist get name if not set to empty str.
  username = computed(() => this.authService.currentUser()?.username ?? '');

  async onLogout(): Promise<void> {
    await this.authService.logout('/home');
  }
}
