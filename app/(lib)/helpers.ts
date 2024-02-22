import { Product } from "./definitions";

export function getProductSlug(product: Product): string {
    return `${product.id}-${product.name.replaceAll(' ', '-')}`
}

export function getProductLink(product: Product):string {
    return (`/product/${getProductSlug(product)}`);
}

export function getSubcategorySlug(subcategory: string): string {
    return subcategory.replaceAll(' ', '-');
}

export function leftPad(input: string, padWith: string, outputStringLength: number): string {
    if (outputStringLength < 0 || outputStringLength < input.concat(padWith).length || outputStringLength < input.length) return input;
    let result = '';
    while(result.concat(padWith).length < outputStringLength) result+=padWith;
    return result.concat(input);
}

