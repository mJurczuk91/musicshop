export type Product = {
    id: string,
    name: string,
    category: string,
    categoryId: string,
    subcategory: string,
    subcategoryId: string,
    price: string,
    amount: number,
    description: string,
    imgUrlArray: string[],
    details: {key:string, value:string}[],
}

export type BlogArticleStub = {
    title: string,
    image_url: string,
    link: string,
    synopsis: string,
}

export type Category = {
    id: string,
    name: string,
    subcategories: Subcategory[],
}

export type Subcategory = {
    id: string,
    name: string,
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

export type PaginatedData<T> = {
    data: T[],
    pagination: null|{
        page: number,
        pageCount: number,
        pageSize: number,
        total: number,
    }
}