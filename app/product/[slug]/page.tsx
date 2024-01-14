import { fetchProductById } from "@/app/(lib)/data"
import ProductBreadcrumbs from "../components/productBreadcrumbs";
import ImageSelector from "../components/imageSelector";
import CommentsSection from "../components/commentsSection";

type Props = {
    params: {
        slug: string,
    }
}
export default async function Page({ params: { slug } }: Props) {
    const id = slug.split('-')[0];
    const product = await fetchProductById(id);
    return (
        <div>
            {slug}
            <ProductBreadcrumbs product={product} />
            <ImageSelector imgUrlArr={product.imgUrlArray} />
            <CommentsSection productId={id} />
        </div>
    )
}