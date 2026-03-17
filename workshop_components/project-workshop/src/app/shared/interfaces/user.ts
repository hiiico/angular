export interface User {
    _id: string;
    username: string;
    email: string;
    tel?: string;
}

export interface UserCredentials extends User{
    password: string;
}
