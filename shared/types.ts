
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
}

export interface LoginCardentials{
    email: string
    password: string,
}
