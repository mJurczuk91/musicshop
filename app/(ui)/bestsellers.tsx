import { fetchProducts } from "../(lib)/data"
import { Product } from "../(lib)/definitions";
import ResponsiveProductGrid from "./responsiveProductGrid";

export default async function Bestsellers() {
    const products = await fetchProducts();
    const selectRandomItemsFromProducts = (amount:number) : Product[] => {
        const result = [];
        for(let i = 0; i < amount; i++){
            const number = Math.floor(Math.random()*products.length)
            result.push(products[number]);
        }
        return result;
    }
    return <ResponsiveProductGrid sectionTitle="Bestsellers" products={selectRandomItemsFromProducts(4)} />
}