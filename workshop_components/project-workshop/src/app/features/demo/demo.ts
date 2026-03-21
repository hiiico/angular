import { Component } from '@angular/core';
import { ThemesList } from './themes/themes-list/themes-list'; 
import { RecentPosts } from './themes/recent-posts/recent-posts';

@Component({
  selector: 'app-demo',
  imports: [ThemesList],
  templateUrl: './demo.html',
  styleUrl: './demo.css',
})
export class Demo {

}
