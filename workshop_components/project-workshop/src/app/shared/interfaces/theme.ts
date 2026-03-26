import {Post} from './post';
export type Subscriber = string | { $oid: string };

export interface Theme {
  _id: string;
  themeName: string;
  subscribers: Subscriber[]; // can be string or { $oid: string }
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
