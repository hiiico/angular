import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../../../core/services/post-service/post-service';
import { Post } from '../../../shared/interfaces/post';
import { PostItem } from '../../../shared/components/post-item/post.item';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-recent-posts',
  imports: [RouterLink, PostItem, AsyncPipe],
  templateUrl: './recent-posts.html',
  styleUrl: './recent-posts.css',
})
export class RecentPosts {
  posts$: Observable<Post[]>;

  constructor(private postService: PostService) {
    this.posts$ = this.postService.posts$;
  }

}
