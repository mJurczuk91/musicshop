import { Product } from "@/app/(lib)/definitions";
import { getProductSlug, getSubcategorySlug } from "@/app/(lib)/helpers";
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

                <Link href={`/categories/${product.categoryId.concat('-').concat(product.category.replaceAll(' ', '-'))}`}>
                    <span className="capitalize">
                        {product.category}
                    </span>
                </Link>

                <span> / </span>

                <Link href={`/categories/${product.categoryId.concat('-').concat(product.category.replaceAll(' ', '-'))}/${getSubcategorySlug({id: product.subcategoryId, name: product.subcategory})}`}>
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