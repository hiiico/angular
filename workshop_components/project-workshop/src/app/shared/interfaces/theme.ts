export interface Theme {
    _id: string,
    themeName: string,
    created_at: string,
    userId: {
        _id:string,
        username: string
    };
    subscribers: string[],
}
