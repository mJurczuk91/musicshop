import { Subcategory } from "@/app/(lib)/definitions";
import { getSubcategorySlug } from "@/app/(lib)/helpers";
import Link from "next/link";

type Props = {
    subcategory: Subcategory,
}

export default function SubcategoryLink({ subcategory }: Props) {
    const subcategorySlug = getSubcategorySlug(subcategory.name, subcategory.id);
    return <Link
        className=" hover:font-bold"
        href={`/category/${subcategorySlug}`}>
        <span className="capitalize">
            {subcategory.name}
        </span>
    </Link>
}