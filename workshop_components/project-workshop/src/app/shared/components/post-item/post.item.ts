import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post-item',
  imports: [],
  templateUrl: './post.item.html',
  styleUrl: './post.item.css',
})
export class PostItem {
@Input({ required: true }) post!: Post;
}
