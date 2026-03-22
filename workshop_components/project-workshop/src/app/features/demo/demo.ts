import { Component } from '@angular/core';
import { ThemesList } from './themes/themes-list/themes-list';
import { RecentPosts } from './themes/recent-posts/recent-posts';
import {AttributeDirective} from './directives/attribute-directive';

@Component({
  selector: 'app-demo',
  imports: [ThemesList, RecentPosts, AttributeDirective],
  templateUrl: './demo.html',
  styleUrl: './demo.css',
})
export class Demo {
  protected readonly statusbar = statusbar;
}
