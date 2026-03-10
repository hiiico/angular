import { Component } from '@angular/core';
import { CounterService } from '../../services/counter';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})

export class Counter {
  constructor(public counterService: CounterService) {}
}
