// src/app/shared/interfaces/post.ts
export interface Post {
  _id: string;
  text: string;
  likes: string[];
  userId: {
    _id: string;
    username: string;
  };
  themeId: {
    _id: string;
    themeName: string;
  };
  created_at: string;
  updatedAt?: string;
  __v?: number;
}

export interface CreatePostRequest {
  postText: string;
}
