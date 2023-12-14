export type Product = {
    name: string,
    category: string,
    subcategory: string,
    price: number,
    amount: number,
    description: string,
    image_url: string,
}

export type Category = {
    name: string,
    subcategories: string[],
}