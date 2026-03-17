import { Component, Input } from '@angular/core';
import { Theme } from '../../interfaces/theme';

@Component({
  selector: 'app-theme-item',
  imports: [],
  templateUrl: './theme.item.html',
  styleUrls: ['./theme.item.css']
})
export class ThemeItem {
  @Input({ required: true }) theme!: Theme;
}