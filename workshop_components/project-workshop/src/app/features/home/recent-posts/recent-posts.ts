import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Post } from '../../../shared/interfaces/post';
import { PostItem } from '../../../shared/components/post-item/post.item';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-recent-posts',
  imports: [PostItem],
  templateUrl: './recent-posts.html',
  styleUrl: './recent-posts.css',
})
export class RecentPosts implements OnInit {
  posts: Post[] = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.cdr.detectChanges();
    });
  }

}
