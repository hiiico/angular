// src/app/core/services/post-service/post-service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Post } from '../../../shared/interfaces/post';
import { Theme } from '../../../shared/interfaces/theme';
import { ApiService } from '../api-service/api.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private apiService: ApiService) {}

  getPostsByThemeId(themeId: string): Observable<Post[]> {
    return this.apiService.getPostsByThemeId(themeId).pipe(
      catchError(err => {
        console.error('Error fetching posts by theme:', err);
        return of([]);
      })
    );
  }

  getLatestPosts(limit: number = 5): Observable<Post[]> {
    return this.apiService.getLatestPosts(limit).pipe(
      catchError(err => {
        console.error('Error fetching latest posts:', err);
        return of([]);
      })
    );
  }

  createPost(themeId: string, text: string): Observable<Theme> {
    return this.apiService.createPost(themeId, text).pipe(
      catchError(err => {
        console.error('Error creating post:', err);
        throw err;
      })
    );
  }

  likePost(postId: string): Observable<any> {
    return this.apiService.likePost(postId).pipe(
      catchError(err => {
        console.error('Error liking post:', err);
        throw err;
      })
    );
  }
}
