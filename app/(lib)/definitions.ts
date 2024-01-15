export type Product = {
    id: string,
    name: string,
    category: string,
    subcategory: string,
    price: string,
    amount: number,
    description: string,
    imgUrlArray: string[],
}

export interface Guitar extends Product {
    
}

export type BlogArticleStub = {
    title: string,
    image_url: string,
    link: string,
    synopsis: string,
}

export type Category = {
    name: string,
    subcategories: string[],
}

export type User = {
    id: string,
    name: string,
}

export type Comment = {
    id: string,
    userId: string,
    userName: string,
    productId: string,
    message: string,
    date: string,
}