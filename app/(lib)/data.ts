import api from "./api";
import { BlogArticleStub, Comment } from "./definitions";
import { Product } from "./definitions";
import { Category } from "./definitions";

const ROUTES = {
    CATEGORIES: 'http://localhost:3001/categories',
    PRODUCTS: 'http://localhost:3001/products',
    ARTICLES: 'http://localhost:3001/articles',
    COMMENTS: 'http://localhost:3001/comments'
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

export async function fetchProductById(id:string):Promise<Product>{
    try {
        const resp = await api.get(ROUTES.PRODUCTS).then(r => r.json()) as Product[];
        const product = resp.find(prod => prod.id === id);
        if(!product) throw new Error('product not found');
        return product;
    } catch (e) {
        throw _handleError(e);
    }
}

export async function fetchCommentsByProductId(id:string):Promise<Comment[]>{
    try{
        const resp = await api.get(ROUTES.COMMENTS).then(c => c.json()) as Comment[];
        const comments = resp.filter(c => c.productId === id );
        return comments;
    } catch (e) {
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
