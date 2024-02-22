import { Product, Category, Subcategory, CategorySlugType } from "./definitions";

export function getProductSlug(product: Product): string {
    return `${product.id}-${product.name.replaceAll(' ', '-')}`
}

export function getCategorySlug(name:string, id: string): string{
    return `c-${id}-${name.replaceAll(' ', '-')}`
}

export function getSubcategorySlug(name:string, id: string): string {
    return `s-${id}-${name.replaceAll(' ', '-')}`;
}

export function parseProductSlug(slug:string){
    const [id, ...rest] = slug.split('-');
    return {
        id,
        name: rest.reduce((previous, current)=> {
            return previous.concat(` ${current}`);
        })
    };
}

export function parseCategorySlug(slug:string):{
    type: CategorySlugType,
    id: string,
    name: string,
}{
    const [type, id, ...rest] = slug.split('-');
    return {
        type: type === 'c' ? CategorySlugType.c : CategorySlugType.s,
        id,
        name: rest.reduce((previous, current)=> {
            return previous.concat(` ${current}`);
        })
    };

export function leftPad(input: string, padWith: string, outputStringLength: number): string {
    if (outputStringLength < 0 || outputStringLength < input.concat(padWith).length || outputStringLength < input.length) return input;
    let result = '';
    while(result.concat(padWith).length < outputStringLength) result+=padWith;
    return result.concat(input);
}

