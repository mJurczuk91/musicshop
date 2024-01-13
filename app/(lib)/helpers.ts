import { Product } from "./definitions";

export function getProductSlug(product: Product): string {
    return `${product.id}-${product.name.replaceAll(' ', '-')}`
}

export function getSubcategorySlug(subcategory: string): string {
    return subcategory.replaceAll(' ', '-');
}