import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CounterService {
  public count = 0;

  getCount(): number {
    return this.count;
  }

  decrement() {
    this.count--;
  }

  increment() {
    this.count++;
  }

  reset() {
    this.count = 0;
  }
}
