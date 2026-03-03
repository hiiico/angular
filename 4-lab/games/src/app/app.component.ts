import { Component } from '@angular/core';
import { ArticlesComponent } from './articles/articles.component'; // <-- import child

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,               // <-- standalone
  imports: [ArticlesComponent]    // <-- import the component we use in the template
})
export class AppComponent {
  title = "Hristo's Site";
}