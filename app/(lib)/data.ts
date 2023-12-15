import { Product } from "./definitions";
import { unstable_noStore as no_store } from "next/cache";

export async function fetchProducts(): Promise<Product[]> {
    no_store();
    if (!process.env.PRODUCTS) throw new Error('Products env var not found');
    let resp;
    try {
        resp = await fetch(process.env.PRODUCTS);
    } catch {
        throw new Error("Couldn't fetch product list");
    }
    return resp.json();
}