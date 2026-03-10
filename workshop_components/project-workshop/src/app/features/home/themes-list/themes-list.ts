import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Theme } from '../../../shared/interfaces/theme';
import { ThemeItem } from '../../../shared/components/theme-item/theme.item';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-themes-list',
  imports: [ThemeItem],
  templateUrl: './themes-list.html',
  styleUrl: './themes-list.css',
})
export class ThemesList implements OnInit {
  themes: Theme[] = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiService.getThemes().subscribe((themes) => {
      this.themes = themes.sort((a, b) => b.subscribers.length - a.subscribers.length);
    this.cdr.detectChanges();
    });
    
  }

}
