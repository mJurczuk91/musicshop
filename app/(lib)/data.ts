import api from "./api";
import { BlogArticleStub } from "./definitions";
import { Product } from "./definitions";
import { Category } from "./definitions";

const ROUTES = {
    CATEGORIES: 'http://localhost:3000/categories',
    PRODUCTS: 'http://localhost:3000/products',
    ARTICLES: 'http://localhost:3000/articles',
}

export async function fetchBlogArticleStubs():Promise<BlogArticleStub[]>{
    try{
        const resp = await api.get(ROUTES.ARTICLES);
        return resp.json();
    } catch(e) {
        throw _handleError(e);
    }
}

export async function fetchProducts(): Promise<Product[]> {
    try {
        const resp = await api.get(ROUTES.PRODUCTS);
        return resp.json();
    } catch(e) {
        throw _handleError(e);
    }  
}

export async function fetchCategories() : Promise<Category[]>{
    try{
        const resp = await api.get(ROUTES.CATEGORIES);
        return resp.json();
    }
    catch(e){
        throw _handleError(e);
    }
}

function _handleError(error:any):Error {
    if(error instanceof Error) return new Error(error.message);
    else return new Error('Something went wrong');
}
