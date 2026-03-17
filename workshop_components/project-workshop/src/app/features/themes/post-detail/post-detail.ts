import { Component } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PostService } from '../../../core/services/post-service/post-service';
import { Post } from '../../../shared/interfaces/post';
import { PostItem } from '../../../shared/components/post-item/post.item';
import { AsyncPipe, NgIf } from '@angular/common';


@Component({
  selector: 'app-post-detail',
  imports: [PostItem, AsyncPipe, NgIf, RouterLink],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetailComponent {
  post$: Observable<Post | undefined>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService) {
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.postService.getPostById(id);
      })
    );
  }
}
