import { Component } from '@angular/core';
import { ThemesList } from './themes-list/themes-list';
import { RecentPosts } from './recent-posts/recent-posts';


@Component({
  selector: 'app-home',
  imports: [ThemesList, RecentPosts],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
