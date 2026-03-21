import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap, map, filter, catchError, startWith, of } from 'rxjs';
import { ThemeService } from '../../../core/services/theme-service/theme-service';
import { Theme } from '../../../shared/interfaces/theme'; 
import { AsyncPipe } from '@angular/common';
import { ThemeItem } from '../../../shared/components/theme-item/theme.item';

@Component({
  selector: 'app-theme-detail',
  standalone: true,
  imports: [ThemeItem, AsyncPipe, RouterLink],
  templateUrl: './theme-detail.html',
  styleUrls: ['./theme-detail.css']
})
export class ThemeDetailComponent implements OnInit {
  // Definite assignment assertion – this will be set in ngOnInit before the template renders
  themeState$!: Observable<{
    loading: boolean;
    error: string | null;
    theme: Theme | null;
  }>;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Get the initial resolved theme from the route snapshot
    const initialTheme = this.route.snapshot.data['theme'] as Theme;

    // Listen to parameter changes (including first load)
    const paramChanges$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter((id): id is string => !!id)
    );

    this.themeState$ = paramChanges$.pipe(
      switchMap(id =>
        this.themeService.getThemeById(id).pipe(
          map(theme => ({
            loading: false,
            error: null,
            theme
          })),
          catchError(err => {
            console.error(err);
            return of({
              loading: false,
              error: 'Failed to load theme. Please try again.',
              theme: null
            });
          }),
          // Emit loading state immediately, but show the previous/initial theme while loading
          startWith({ loading: true, error: null, theme: initialTheme })
        )
      )
    );
  }
}