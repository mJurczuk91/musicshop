import api from "./api";
import { Product } from "./definitions";

const ROUTES = {
    CATEGORIES: 'http://localhost:3000/categories',
    PRODUCTS: 'http://localhost:3000/products',
}

export async function fetchProducts(): Promise<Product[]> {
    let resp;
    try {
        resp = await api.get(ROUTES.PRODUCTS);
    } catch {
        throw new Error("Couldn't fetch product list");
    }
    return resp.json();
}
