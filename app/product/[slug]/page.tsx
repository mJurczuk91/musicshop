import ProductBreadcrumbs from "./components/productBreadcrumbs";
import ImageSelector from "./components/imageSelector";
import ProductCommentsSection from "./components/productCommentsSection";
import ProductDetails from "./components/productDetails";
import TabMenu from "./components/tabMenu";
import ProductDescription from "./components/productDescription";
import { products } from "@/app/(lib)/services/products";

type Props = {
    params: {
        slug: string,
    }
}
export default async function Page({ params: { slug } }: Props) {
    const id = slug.split('-')[0];
    const product = await products.getById(id);
    return (
        <div>
            <ProductBreadcrumbs product={product} />
            <div className="w-full shadow-lg">
                <ImageSelector imgUrlArr={product.imgUrlArray} />
            </div>
            <TabMenu elements={[
                { title: 'details', jsx: <ProductDetails details={product.details} /> },
                { title: 'comments', jsx: <ProductCommentsSection productId={id} /> },
                { title: 'description', jsx: <ProductDescription description={product.description} name={product.name} /> },
            ]} />
        </div>
    )
}