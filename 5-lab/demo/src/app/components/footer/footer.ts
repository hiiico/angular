import { Component } from '@angular/core';
import { Header } from '../header/header';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {


  getTitle(): string {
    return "Hiiigo's Platform";
  }
}
