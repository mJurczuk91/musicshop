import api from "./api";
import { Category } from "./definitions";

const ROUTES = {
    CATEGORIES: 'http://localhost:3000/categories',
    PRODUCTS: 'http://localhost:3000/products',
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
}