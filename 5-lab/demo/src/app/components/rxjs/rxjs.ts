import { Component } from '@angular/core';
import { of, from, map, filter, tap } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  imports: [],
  templateUrl: './rxjs.html',
  styleUrl: './rxjs.css',
})
export class Rxjs {
  public results: string[] = [];

  clearResults(): void {
    this.results = [];
  }

  of(): void {
    this.clearResults();

    of('HiiiGO').subscribe((value) => this.results.push(value.toString()));
  }

  pipe(): void {
    this.clearResults();

    from(['HiiiGO'])
      .pipe(
        map((value) => value + ' your platform'),
        filter((value) => value === 'HiiiGO your platform'),
      )
      .subscribe((value) => this.results.push(value.toString()));
  }

  tap(): void {
    this.clearResults();

    of('HiiiGO')
      .pipe(
        tap((value) => this.results.push('Before: ' + value)),
        map((value) => value + ' is your platform'),
        tap((value) => this.results.push('After: ' + value)),
      )
      .subscribe();
  }
}
