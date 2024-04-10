import ProductBreadcrumbs from "./components/productBreadcrumbs";
import ImageSelector from "./components/imageSelector";
import ProductCommentsSection from "./components/productCommentsSection";
import ProductDetails from "./components/productDetails";
import TabMenu from "./components/tabMenu";
import ProductDescription from "./components/productDescription";
import { products } from "@/app/(lib)/services/products";
import { AddToCart } from "./components/addToCart/addToCart";

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
            <div className="flex flex-col w-full items-center">
                
                <div className="flex flex-col lg:flex-row w-full max-w-6xl items-center">
                    <div className="flex-1">
                        <ImageSelector imgUrlArr={product.imgUrlArray} />
                    </div>
                    <div className="flex-1">
                        <AddToCart product={product} />
                    </div>
                </div>

                <TabMenu elements={[
                    { title: 'details', jsx: <ProductDetails details={product.details} /> },
                    { title: 'comments', jsx: <ProductCommentsSection productId={id} /> },
                ]} />
            </div>
        </div>
    )
}