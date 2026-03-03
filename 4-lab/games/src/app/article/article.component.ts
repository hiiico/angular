import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  standalone: true                // <-- standalone
})

export class ArticleComponent implements OnInit {
  @Input() article!: Article;
  @Input() articleDesc!: string;
  @Output() addToCart = new EventEmitter<Article>();

  descToShow: string;
  articleDescLen: number;
  showReadMoreBtn = true;
  showHideBtn = false;
  imageIsShown = false;
  imageButtonTitle = 'Show Image';

  constructor() {
    this.articleDescLen = 0;
    this.descToShow = '';
  }

  ngOnInit(): void {}

  readMore() {
    this.articleDescLen += 250;
    if (this.articleDescLen >= this.articleDesc.length) {
      this.articleDescLen = this.articleDesc.length;
      this.showReadMoreBtn = false;
      this.showHideBtn = true;
    }
    this.descToShow = this.articleDesc.substring(0, this.articleDescLen);
  }

  hideDesc() {
    this.descToShow = '';
    this.articleDescLen = 0;
    this.showReadMoreBtn = true;
    this.showHideBtn = false;
  }

  toggleImage() {
    this.imageIsShown = !this.imageIsShown;
    this.imageButtonTitle = this.imageIsShown ? 'Hide Image' : 'Show Image';
  }

  onAddToCart(article: Article) {
    this.addToCart.emit(article);
  }
}

