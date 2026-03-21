// src/app/features/themes/recent-posts/recent-posts.ts
import { Component, OnInit, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { Post } from '../../../shared/interfaces/post';
import { PostService } from '../../../core/services/post-service/post-service';
import { PostItem } from '../../../shared/components/post-item/post.item';

@Component({
  selector: 'app-recent-posts',
  standalone: true,
  imports: [AsyncPipe, PostItem],
  templateUrl: './recent-posts.html',
  styleUrls: ['./recent-posts.css']
})
export class RecentPosts implements OnInit {
  private postService = inject(PostService);

  posts$!: Observable<Post[]>;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.posts$ = this.postService.getLatestPosts(5).pipe(
      tap({
        next: () => (this.loading = false),
        error: (err) => {
          this.loading = false;
          this.error = 'Failed to load posts';
          console.error(err);
        }
      }),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }
}
