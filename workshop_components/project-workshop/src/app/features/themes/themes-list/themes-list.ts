import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Theme } from '../../../shared/interfaces/theme';
import { ThemeService } from '../../../core/services/theme-service/theme-service';
import { ThemeItem } from '../../../shared/components/theme-item/theme.item';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-themes-list',
  imports: [RouterLink, ThemeItem, AsyncPipe],
  templateUrl: './themes-list.html',
  styleUrls: ['./themes-list.css']
})
export class ThemesList implements OnInit {
  themes$: Observable<Theme[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private themeService: ThemeService) {
    // Assign observables after themeService is available
    this.themes$ = this.themeService.themes$;
    this.loading$ = this.themeService.loading$;
    this.error$ = this.themeService.error$;
  }

  ngOnInit(): void {
    // Trigger load (the service will only fetch once thanks to loaded flag)
    this.themeService.loadThemes();
  }
}