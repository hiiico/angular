import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ThemeService } from '../../core/services/theme-service/theme-service';

@Component({
  selector: 'app-new-theme',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-theme.html',
  styleUrls: ['./new-theme.css']
})
export class NewThemeComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);

  themeName = '';
  postText = '';
  isLoading = false;
  errorMessage = '';

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const newTheme = await this.themeService.createTheme({
        themeName: this.themeName,
        postText: this.postText
      }).toPromise(); // or firstValueFrom
      // Navigate to the newly created theme's detail page
      // @ts-ignore
      await this.router.navigate(['/themes', newTheme._id]);
    } catch (error: any) {
      this.errorMessage = error?.error?.message || error?.message || 'Failed to create theme. Please try again.';
      console.error('Create theme error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  cancel(): void {
    this.router.navigate(['/themes']);
  }
}
