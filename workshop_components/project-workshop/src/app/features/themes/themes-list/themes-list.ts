import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

  themes$!: Observable<Theme[]>;

  ngOnInit(): void {
    this.themes$ = this.themeService.getThemes();
    console.log(`Themes: ${this.themes$}`)
  }
}
