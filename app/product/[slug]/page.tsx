import { fetchProductById } from "@/app/(lib)/data"
import ProductBreadcrumbs from "../components/productBreadcrumbs";

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
        </div>
    )
}