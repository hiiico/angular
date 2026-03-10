import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-clock',
  imports: [],
  templateUrl: './clock.html',
  styleUrl: './clock.css',
})
export class Clock {

  currentTime: string = '';

  constructor() {
    this.updateTime();
  }

  get currentTimeObservable() {
    return new Observable<string>((observer) => {
      const intervalId = setInterval(() => {
        observer.next(new Date().toLocaleTimeString());
      }, 1000);

      return () => clearInterval(intervalId);
    }
    );
  }

  updateTime() {
    this.currentTimeObservable.subscribe(time => {
      this.currentTime = time;
    });
  }
}
