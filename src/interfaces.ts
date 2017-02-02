export interface User {
    permalink_url: string;
    username: string;
}

export interface Track {
    id: number;
    title: string;
    artwork_url: string;
    permalink_url: string;
    user: User;
}