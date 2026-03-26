import { Component, OnInit, inject } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, switchMap} from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Theme } from '../../../shared/interfaces/theme';
import { ThemeService } from '../../../core/services/theme-service/theme-service';
import { ThemeItem } from '../../../shared/components/theme-item/theme.item';

@Component({
  selector: 'app-themes-list',
  standalone: true, // if standalone; otherwise add to module imports
  imports: [AsyncPipe, ThemeItem],
  templateUrl: './themes-list.html',
  styleUrls: ['./themes-list.css'],
})
export class ThemesList implements OnInit {
  private themeService = inject(ThemeService);
  private refreshTrigger = new BehaviorSubject<void>(undefined);

  themes$: Observable<Theme[]> = this.refreshTrigger.pipe(
    switchMap(() => this.themeService.getThemes().pipe(
      catchError(err => {
        console.error('Failed to load themes', err);
        return of([]);
      })
    ))
  );

  ngOnInit(): void {
    this.refreshTrigger.next();
  }

  onSubscriptionChanged(): void {
    // reload the list to update subscriber counts
    this.refreshTrigger.next();
  }
}
