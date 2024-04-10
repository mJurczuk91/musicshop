import ResponsiveProductGrid from "./responsiveProductGrid";
import { products as productsService } from "../(lib)/services/products";

export default async function Bestsellers() {
    const products = (await productsService.getPage()).data;
    return <ResponsiveProductGrid sectionTitle="Bestsellers" products={products.slice(0, 4)} />
}