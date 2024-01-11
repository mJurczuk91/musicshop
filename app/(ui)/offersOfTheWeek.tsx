import ResponsiveProductGrid from "./responsiveProductGrid";
import { fetchProducts } from "../(lib)/data";

export default async function OffersOfTheWeek () {
    const selectProductsToDisplay = async () => {
        return (await fetchProducts()).slice(0, 8);
    };
    return (
        <ResponsiveProductGrid products={await selectProductsToDisplay()} sectionTitle="offers of the week"/>
    )
}