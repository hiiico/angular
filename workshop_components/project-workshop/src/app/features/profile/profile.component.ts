import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, } from '@angular/router';
import { ProfileService } from '../../core/services/profile-service/profile.service';
import { User } from '../../shared/interfaces/user';
import {AuthService} from '../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  profile: User = {created_at: '', posts: [], themes: [], _id: '', username: '', email: '', tel: '' };
  originalProfile: User = {created_at: '', posts: [], themes: [], _id: '', username: '', email: '', tel: '' };
  isLoading = false;
  errorMessage = '';

  phonePrefixes = ['+359', '+1', '+44', '+49'];
  selectedPrefix = '+359';
  phoneNumber = '';

  ngOnInit(): void {
    this.loadProfile();
  }

  async loadProfile(): Promise<void> {
    this.isLoading = true;
    try {
      const data = await this.profileService.getProfile();
      this.profile = { ...data, tel: data.tel || '' };
      this.originalProfile = { ...this.profile };
      this.splitPhoneNumber();
    } catch (error) {
      this.errorMessage = 'Failed to load profile. Please try again.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
    this.cdr.detectChanges(); // force update
  }

  splitPhoneNumber(): void {
    const tel = this.profile.tel || '';
    const matchedPrefix = this.phonePrefixes.find(p => tel.startsWith(p));
    if (matchedPrefix) {
      this.selectedPrefix = matchedPrefix;
      this.phoneNumber = tel.slice(matchedPrefix.length);
    } else {
      this.selectedPrefix = this.phonePrefixes[0];
      this.phoneNumber = tel;
    }
  }

  updatePhone(): void {
    this.profile.tel = this.selectedPrefix + this.phoneNumber;
  }

  async onSave(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.updatePhone();

    try {
      const updated = await this.profileService.updateProfile(this.profile);
      this.authService.setSession(updated);
      this.profile = { ...updated, tel: updated.tel || '' };
      this.originalProfile = { ...this.profile };
      this.splitPhoneNumber();
      alert('Profile updated successfully!');
    } catch (error) {
      this.errorMessage = 'Failed to update profile. Please try again.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  onCancel(): void {
    this.profile = { ...this.originalProfile };
    this.splitPhoneNumber();
    this.router.navigate(['/home']);
  }
}
