import { Category, Subcategory } from "@/app/(lib)/definitions";
import { getCategorySlug, getSubcategorySlug } from "@/app/(lib)/helpers";
import Link from "next/link";

type Props = {
    category: Category,
    subcategory: Subcategory,
}

export default function SubcategoryLink({ category, subcategory }: Props) {
    const subcategorySlug = getSubcategorySlug(subcategory);
    const categorySlug = getCategorySlug(category)
    return <Link href={`/category/${categorySlug}/${subcategorySlug}`}>
        <span className="capitalize">
            {subcategory.name}
        </span>
    </Link>
}