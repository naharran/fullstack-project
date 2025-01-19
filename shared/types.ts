
export interface UserFormData{
    email: string
    password: string 
    firstName: string
    lastName: string
}

export interface User {
    email: string 
    firstName: string
    lastName: string
    id: string
    password?: string
    createdAt?: string | Date
}

export interface LoginCardentials{
    email: string
    password: string,
}

export interface Artist {
    id: number;
    name: string
}

export interface Artwork {
    id: string; 
    name: string;
    description: string; 
    price: number;
    image?: string;
    artistId: number;
    category: string;
    createdAt?: string | Date
}
export type ArtworkForm = Omit<Artwork, 'id' >;
export type ArtworkQuery = Partial<Pick<Artwork, 'name' | 'description'>>

