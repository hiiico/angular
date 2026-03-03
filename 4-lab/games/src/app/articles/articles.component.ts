import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article.model'; // <-- import the Article interface
import { Data } from '../data/data';
import { ArticleComponent } from '../article/article.component'; // <-- import child

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  standalone: true,                     // <-- standalone
  imports: [ArticleComponent]            // <-- import the component used in the template
})

export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  cart: Article[] = [];

  ngOnInit(): void {
    this.articles = new Data().getData();
  }

  addToCart(article: Article) {
    this.cart.push(article);
    console.log(`Added to cart: ${article.title}`);
  }
}