import {Post} from './post';

export interface Theme {
  _id: string;
  themeName: string;
  subscribers: string[];
  posts: Post[];  // This should be an array of Post objects
  userId: {
    _id: string;
    username: string;
  };
  created_at: string;
  updatedAt?: string;
  __v?: number;
}

export interface CreateThemeRequest {
  themeName: string;
  postText: string;
}
