import { Product } from "@/app/(lib)/definitions";
import { getProductSlug, getCategorySlug, getSubcategorySlug } from "@/app/(lib)/helpers";
import Link from "next/link";

type Props = {
    product: Product
}

export default function ProductBreadcrumbs({ product }: Props) {
    return (
        <div className="w-full py-2 px-4 border-gray-400 border-opacity-25 border-b-2">
            <div>
                <Link href={'/'}>Home page</Link>

                <span> / </span>

                <Link href={`/category/${getCategorySlug(product.category, product.categoryId)}`}>
                    <span className="capitalize">
                        {product.category}
                    </span>
                </Link>

                <span> / </span>

                <Link href={`/category/${getSubcategorySlug(product.subcategory, product.subcategoryId)}`}>
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