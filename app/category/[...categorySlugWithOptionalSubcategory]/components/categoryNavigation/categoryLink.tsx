import { Category } from "@/app/(lib)/definitions";
import { getCategorySlug } from "@/app/(lib)/helpers";
import Link from "next/link";
type Props = {
    category: Category,
}

export default function CategoryLink({ category }: Props) {
    const slug = getCategorySlug(category);
    return (
        <Link href={`/category/${slug}`}>
            <span className="capitalize">
                {category.name}
            </span>
        </Link>
    )
}