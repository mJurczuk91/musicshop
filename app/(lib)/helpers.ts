import { Product, Category, Subcategory } from "./definitions";

export function getProductSlug(product: Product): string {
    return `${product.id}-${product.name.replaceAll(' ', '-')}`
}

export function getCategorySlug(category: Category): string{
    return `${category.id}-${category.name.replaceAll(' ', '-')}`
}

export function getSubcategorySlug(subcategory: Subcategory): string {
    return `${subcategory.id}-${subcategory.name.replaceAll(' ', '-')}`;
}

export function parseSlug(slug:string){
    const [id, ...rest] = slug.split('-');
    return {
        id,
        name: rest.reduce((previous, current)=> {
            return previous.concat(` ${current}`);
        })
    };
}

export function leftPad(input: string, padWith: string, outputStringLength: number): string {
    if (outputStringLength < 0 || outputStringLength < input.concat(padWith).length || outputStringLength < input.length) return input;
    let result = '';
    while(result.concat(padWith).length < outputStringLength) result+=padWith;
    return result.concat(input);
}