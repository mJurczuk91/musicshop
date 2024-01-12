export type Product = {
    id: string,
    name: string,
    category: string,
    subcategory: string,
    price: string,
    amount: number,
    description: string,
    image_url: string,
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