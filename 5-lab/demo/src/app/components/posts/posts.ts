import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { HttpService } from '../../services/http-service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  constructor(
    private httpService: HttpService,
    private cdr: ChangeDetectorRef,
  ) {}

  posts: Post[] = [];

  ngOnInit(): void {
    this.loadAll(); // first time load
  }

  loadAll(): void {
    this.httpService.getAll().subscribe({
      next: (data) => {
        // next -> input data
        this.posts = data.slice(0, 6);
        this.cdr.detectChanges();
      },
      error(err) {
        console.log(err); // error
      },
    });
  }

  delete(id: number): void {
    this.httpService.delete(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((p) => p.id != id);
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
  // complete -> timers
}
