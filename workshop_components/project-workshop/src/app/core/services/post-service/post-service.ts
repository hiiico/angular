import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Post } from '../../../shared/interfaces/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = 'http://localhost:3000/api';

  // Private subject holds the current posts array
  private postsSubject = new BehaviorSubject<Post[]>([]);

  // Public observable – components subscribe to this
  posts$: Observable<Post[]> = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.http
      .get<Post[]>(`${this.apiUrl}/posts?limit=5`)
      .pipe(
        tap((posts) => console.log('Posts loaded', posts)), // optional logging
        // catchError(err => {
        //   console.error('Failed to load posts', err);
        //   // Return an empty array so the stream doesn't break
        //   return [];
        // })
      )
      .subscribe({
        // Emit the new array to all subscribers
        next: (post) => this.postsSubject.next(post),
        error: (err) => console.log('Failed to load posts', err),
      });
  }

  getPostById(id: string): Observable<Post | undefined> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`).pipe(
      map((posts) => posts.find((post) => post._id === id)),
      tap((post) => {
        if (post) {
          console.log('Received post', post);
        } else {
          console.log(`Post with id ${id} not found`);
        }
      }),
    );
  }

  // Optional: method to refresh posts manually
  refreshPosts(): void {
    this.loadPosts();
  }
}
