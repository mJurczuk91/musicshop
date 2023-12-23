import api from "./api";
<<<<<<< HEAD
import { BlogArticleStub } from "./definitions";
=======
import { Product } from "./definitions";
import { Category } from "./definitions";
>>>>>>> main

const ROUTES = {
    CATEGORIES: 'http://localhost:3000/categories',
    PRODUCTS: 'http://localhost:3000/products',
<<<<<<< HEAD
    ARTICLES: 'http://localhost:3000/articles',
}

export async function fetchBlogArticleStubs():Promise<BlogArticleStub[]>{
    try{
        const resp = await api.get(ROUTES.CATEGORIES);
        return resp.json();
    } catch {
        throw new Error ("Fetching article stubs failed")
    }
=======
}

export async function fetchProducts(): Promise<Product[]> {
    let resp;
    try {
        resp = await api.get(ROUTES.PRODUCTS);
    } catch(err) {
        if(err instanceof Error) throw new Error(err.message);
        else throw new Error('Something went wrong');
    }
    return resp.json();
}

export async function fetchCategories() : Promise<Category[]>{
    let resp;
    try{
        resp = await api.get(ROUTES.CATEGORIES);
    }
    catch(err){
        if(err instanceof Error) throw new Error(err.message);
        else throw new Error('Something went wrong');
    }
    return resp.json();
>>>>>>> main
}
