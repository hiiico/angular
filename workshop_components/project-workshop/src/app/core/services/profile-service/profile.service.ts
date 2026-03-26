// src/app/core/services/profile/profile.service.ts
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { User } from '../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiService = inject(ApiService);

  async getProfile(): Promise<User> {
    return firstValueFrom(this.apiService.getProfile());
  }

  async updateProfile(profile: Partial<User>): Promise<User> {
    return firstValueFrom(this.apiService.updateProfile(profile));
  }

  async addThemeToUser(themeId: string): Promise<User> {
    const user = await this.getProfile();
    const themes = user.themes || [];
    if (!themes.includes(themeId)) {
      themes.push(themeId);
      return this.updateProfile({ themes });
    }
    return user;
  }

  async removeThemeFromUser(themeId: string): Promise<User> {
    const user = await this.getProfile();
    const themes = user.themes || [];
    const updatedThemes = themes.filter(id => id !== themeId);
    if (updatedThemes.length !== themes.length) {
      return this.updateProfile({ themes: updatedThemes });
    }
    return user;
  }
}
