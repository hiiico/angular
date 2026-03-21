import { Component, Input } from '@angular/core';
import { Theme } from '../../interfaces/theme';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-theme-item',
  imports: [RouterLink, DatePipe],
  templateUrl: './theme.item.html',
  styleUrls: ['./theme.item.css']
})
export class ThemeItem {
  @Input({ required: true }) theme!: Theme;
}