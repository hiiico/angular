import { Article } from '../models/article.model';
import { data } from './seed';

export class Data {
  getData(): Article[] {
    const articles: Article[] = [];
    for (let i = 0; i < data.length; i++) {
      articles.push({
        title: data[i].title,
        description: data[i].description,
        author: data[i].author,
        imageUrl: data[i].imageUrl,
      });
    }
    return articles;
  }
}
