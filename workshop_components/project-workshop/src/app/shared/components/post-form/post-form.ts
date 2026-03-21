import { Component, Input, Output, EventEmitter } from '@angular/core';
import { inject } from '@angular/core';
import { PostService } from '../../../core/services/post-service/post-service';
import { AuthService } from '../../../core/services/auth-service/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  imports: [FormsModule],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css',
})
export class PostFormComponent {
  @Input() themeId!: string;
  @Output() postCreated = new EventEmitter<void>();

  private postService = inject(PostService);
  private authService = inject(AuthService);

  get currentUsername(): string {
    return this.authService.currentUser()?.username || 'Guest';
  }

  onAddPost(content: string): void {
    if (!this.themeId) {
      console.error('No themeId provided to PostFormComponent');
      return;
    }
    const userId = this.authService.currentUser()?._id;
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    this.postService.createPost(this.themeId, content, userId).subscribe({
      next: () => {
        this.postCreated.emit();
      },
      error: (err) => console.error('Error creating post', err)
    });
  }
}