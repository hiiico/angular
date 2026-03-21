import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-item',
  imports: [DatePipe],
  templateUrl: './post.item.html',
  styleUrl: './post.item.css',
})
export class PostItem {
@Input({ required: true }) post!: Post;
}
