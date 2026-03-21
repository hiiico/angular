// src/app/core/services/post-service/post-service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, shareReplay, catchError } from 'rxjs/operators';
import { Post } from '../../../shared/interfaces/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient)
  private postsCache$?: Observable<Post[]> | null = null;

 getAllPosts(): Observable<Post[]> {
  if (!this.postsCache$) {
    this.postsCache$ = this.http.get<Post[]>(`${this.apiUrl}/posts`).pipe(
      tap(posts => console.log('Posts received:', posts)),
      shareReplay(1)
    );
  }
  return this.postsCache$;
}

  getPostsByThemeId(themeId: string): Observable<Post[]> {
    return this.getAllPosts().pipe(
      map(posts => posts.filter(post => post.themeId._id === themeId))
    );
  }

  createPost(themeId: string, text: string, userId: string): Observable<Post> {
    const newPost = { themeId, text, userId };
    return this.http.post<Post>(`${this.apiUrl}/posts`, newPost).pipe(
      tap(() => {
        this.postsCache$ = null;
      })
    );
  }
}