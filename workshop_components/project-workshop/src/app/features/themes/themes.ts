import { Component } from '@angular/core';
import { ThemeContent } from './theme-content/theme-content';
import {ThemesList} from './themes-list/themes-list';


@Component({
  selector: 'app-themes',
  imports: [ThemesList],
  templateUrl: './themes.html',
  styleUrl: './themes.css',
})
export class Themes {
}
