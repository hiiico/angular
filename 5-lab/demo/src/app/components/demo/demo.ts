import { Component } from '@angular/core';
import { Counter } from '../counter/counter';
import { Rxjs } from '../rxjs/rxjs';
import { Posts } from '../posts/posts';


@Component({
  selector: 'app-demo',
  imports: [Counter, Rxjs, Posts],
  templateUrl: './demo.html',
  styleUrl: './demo.css',
})
export class Demo {

}
