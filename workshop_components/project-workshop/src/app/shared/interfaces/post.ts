export interface Post {
    _id: string,
    text: string,
    userId: {
        _id: string,
        username: string,
    }
    themeId: {
        _id:string,
        themeName: string,
    }
    created_at: string,
    likes?: string[],
}
