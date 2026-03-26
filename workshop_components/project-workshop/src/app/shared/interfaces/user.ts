// src/app/shared/interfaces/user-service.ts
export interface User {
  _id: string;
  username: string;
  email: string;
  tel?: string;
  themes?: string[];      // array of theme IDs
  posts: string[];       // array of post IDs
  created_at: string;
  updatedAt?: string;
  __v?: number;
}

export interface UserCredentials {
  _id?: string;
  username: string;
  email: string;
  password: string;
  tel?: string;
}
