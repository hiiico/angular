// src/app/features/themes/recent-posts/recent-posts.ts
import { Component, OnInit, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Post } from '../../../shared/interfaces/post';
import { PostService } from '../../../core/services/post-service/post-service';
import { PostItem } from '../../../shared/components/post-item/post.item';

@Component({
  selector: 'app-recent-posts',
  standalone: true,                         // adjust if not using standalone
  imports: [AsyncPipe, PostItem], // import necessary pipes and the post item component
  templateUrl: './recent-posts.html',
  styleUrls: ['./recent-posts.css']
})
export class RecentPosts implements OnInit {
  private postService = inject(PostService);

  posts$!: Observable<Post[]>;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.posts$ = this.postService.getAllPosts().pipe(
      tap({
        next: () => (this.loading = false),
        error: (err) => {
          this.loading = false;
          this.error = 'Failed to load posts';
          console.error(err);
        }
      }),
      // Sort posts by creation date, most recent first
      map(posts => posts.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )),
      // In case of error, emit an empty array (but we already set error flag)
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }
}