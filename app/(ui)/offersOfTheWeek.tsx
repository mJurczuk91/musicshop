import ResponsiveProductGrid from "./responsiveProductGrid";
import { fetchProducts } from "../(lib)/data";
import { products as productsService } from "../(lib)/services/products";

export default async function OffersOfTheWeek () {
    const products = (await productsService.getPage()).data.slice(8,16)
    return (
        <ResponsiveProductGrid products={products} sectionTitle="offers of the week"/>
    )
}