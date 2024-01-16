import { Product } from "@/app/(lib)/definitions";
import { getProductSlug, getSubcategorySlug } from "@/app/(lib)/helpers";
import Link from "next/link";

type Props = {
    product: Product
}

export default function ProductBreadcrumbs({ product }: Props) {
    return (
        <div>
            <div>
                <Link href={'/'}>Home page</Link>

                <span> / </span>

                <Link href={`/categories/${product.category}`}>
                    <span className="capitalize">
                        {product.category}
                    </span>
                </Link>

                <span> / </span>

                <Link href={`/categories/${product.category}/${getSubcategorySlug(product.subcategory)}`}>
                    <span className="capitalize">
                        {product.subcategory}
                    </span>
                </Link>

                <span> / </span>

                <Link href={`/product/${getProductSlug(product)}`}>
                    <span className="capitalize font-bold">
                        {product.name}
                    </span>
                </Link>
            </div>
        </div>
    )
}