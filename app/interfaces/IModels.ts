export interface UserItem extends RequestItem {
    id: string
}

export interface RequestItem {
    name: string
    email: string
    age: number
}

export interface ResponseItem {
    success: boolean
    message: string
}