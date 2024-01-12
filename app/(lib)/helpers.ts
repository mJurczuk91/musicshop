import { Product } from "./definitions";

export function getProductSlug(product: Product): string {
    console.log(product);
    return `${product.id}-${product.name.replaceAll(' ', '-')}`
}

export function getSubcategorySlug(subcategory: string): string {
    return subcategory.replaceAll(' ', '-');
}