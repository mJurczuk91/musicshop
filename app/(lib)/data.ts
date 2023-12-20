import api from "./api";
import { BlogArticleStub } from "./definitions";

const ROUTES = {
    CATEGORIES: 'http://localhost:3000/categories',
    PRODUCTS: 'http://localhost:3000/products',
    ARTICLES: 'http://localhost:3000/articles',
}

export async function fetchBlogArticleStubs():Promise<BlogArticleStub[]>{
    try{
        const resp = await api.get(ROUTES.CATEGORIES);
        return resp.json();
    } catch {
        throw new Error ("Fetching article stubs failed")
    }
}
