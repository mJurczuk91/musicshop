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
    details: { key: string, value: string }[],
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
    pagination: Pagination | undefined,
}

export type Pagination = {
    page: number,
    pageCount: number,
    pageSize: number,
    total: number,
}

export enum CategorySlugType {
    'c'='CATEGORY',
    's'='SUBCATEGORY'
}

export type CartItem = {
    product: Product,
    amount: number,
}

export type OrderElement = {
    itemId: string,
    itemPrice: string,
    itemName: string,
    itemImageUrl: string,
    amount: number,
}

export type OrderHistoryEntry = {
    products: OrderElement[],
    createdAt: string,
    user: User,
    id: string,
}

export type LoginTokenPayload = {
    id: string,
    name: string,
    iat: number,
    exp: number,
}
