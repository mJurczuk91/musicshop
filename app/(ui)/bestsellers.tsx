import { fetchProducts } from "../(lib)/data"
import ResponsiveProductGrid from "./responsiveProductGrid";

export default async function Bestsellers() {
    const products = await fetchProducts();
    return <ResponsiveProductGrid sectionTitle="Bestsellers" products={products.slice(0, 4)} />
}