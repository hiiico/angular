// src/app/shared/components/post-form/post-form.component.ts
import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../core/services/post-service/post-service';
import { AuthService } from '../../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-form.html',
  styleUrls: ['./post-form.css']
})
export class PostFormComponent implements OnInit {
  @Input() themeId!: string;
  @Output() postCreated = new EventEmitter<void>();

  private postService = inject(PostService);
  private authService = inject(AuthService);

  currentUsername = 'Guest';

  ngOnInit(): void {
    this.currentUsername = this.authService.getCurrentUsername();
  }

  onAddPost(content: string): void {
    if (!this.themeId) {
      console.error('No themeId provided to PostFormComponent');
      return;
    }

    if (!this.authService.isLoggedIn()) {
      console.error('User not logged in');
      return;
    }

    this.postService.createPost(this.themeId, content).subscribe({
      next: () => {
        this.postCreated.emit();
      },
      error: (err: Error) => console.error('Error creating post', err)
    });
  }
}
