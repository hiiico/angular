// src/app/shared/components/theme-item/theme.item.ts
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Theme } from '../../interfaces/theme';
import { RouterLink } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme-service/theme-service';
import { AuthService } from '../../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-theme-item',
  standalone: true,
  imports: [RouterLink, DatePipe, CommonModule],
  templateUrl: './theme.item.html',
  styleUrls: ['./theme.item.css']
})
export class ThemeItem {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);

  @Input({ required: true }) theme!: Theme;
  @Output() subscriptionChanged = new EventEmitter<void>();

  isLoading = false;
  errorMessage = '';

  get isSubscribed(): boolean {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return false;
    if (!this.theme.subscribers) return false;

    const subscriberIds = this.theme.subscribers.map(sub => this.extractUserId(sub));
    return subscriberIds.includes(userId);
  }

  private extractUserId(subscriber: any): string {
    if (typeof subscriber === 'string') return subscriber;
    if (subscriber && typeof subscriber === 'object' && '$oid' in subscriber) {
      return subscriber.$oid;
    }
    return '';
  }

  async subscribe(): Promise<void> {
    if (this.isSubscribed) return;
    this.isLoading = true;
    try {
      await this.themeService.subscribe(this.theme._id);
      this.subscriptionChanged.emit(); // triggers list reload
    } catch (error) {
      this.errorMessage = 'Failed to subscribe.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async unsubscribe(): Promise<void> {
    if (!this.isSubscribed) return;
    this.isLoading = true;
    try {
      await this.themeService.unsubscribe(this.theme._id);
      this.subscriptionChanged.emit(); // triggers list reload
    } catch (error) {
      this.errorMessage = 'Failed to unsubscribe.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
