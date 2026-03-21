import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, catchError, of } from 'rxjs';
import { Theme } from '../../../shared/interfaces/theme';
import { Post } from '../../../shared/interfaces/post';
import { ThemeService } from '../../../core/services/theme-service/theme-service';
import { PostService } from '../../../core/services/post-service/post-service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeItem } from '../../../shared/components/theme-item/theme.item';
import { PostItem } from '../../../shared/components/post-item/post.item';
import {PostFormComponent} from '../../../shared/components/post-form/post-form.component';

@Component({
  selector: 'app-theme-content',
  imports: [AsyncPipe, FormsModule, ThemeItem, PostItem, PostFormComponent],
  templateUrl: './theme-content.html',
  styleUrl: './theme-content.css',
})
export class ThemeContent implements OnInit {
  private route = inject(ActivatedRoute);
  private themeService = inject(ThemeService);
  private postService = inject(PostService);

  theme$!: Observable<Theme | null>;
  posts$!: Observable<Post[]>;

  ngOnInit(): void {
    const themeId$ = this.route.params.pipe(
      map((params) => params['id']),
    );

    this.theme$ = themeId$.pipe(
      switchMap((id) =>
        this.themeService.getThemeById(id).pipe(
          catchError((err) => {
            console.error('Error loading theme', err);
            return of(null);
          }),
        ),
      ),
    );

    this.loadPosts(themeId$);
  }

  private loadPosts(themeId$: Observable<string>): void {
    this.posts$ = themeId$.pipe(
      switchMap((id) =>
        this.postService.getPostsByThemeId(id).pipe(
          catchError((err) => {
            console.error('Error loading posts', err);
            return of([]);
          }),
        ),
      ),
    );
  }

  refreshPosts(): void {
    const themeId$ = this.route.params.pipe(
      map((params) => params['id']),
    );
    this.loadPosts(themeId$);
  }
}
