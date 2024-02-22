import Link from "next/link"
import { Category } from "@/app/(lib)/definitions"
import { getCategorySlug, getSubcategorySlug } from "@/app/(lib)/helpers"

type Props = {
    category: Category,
}

export default function CategoryMenuItem({category}:Props) {
    return <div className="group">
        <Link className="mx-4 capitalize" href={`/category/${getCategorySlug(category.name, category.id)}`}>
            {category.name}
        </Link>
        <div className="invisible absolute flex flex-col p-6 bg-white shadow-md group-hover:visible">
            {category.subcategories.map((subcategory) => {
                return <Link key={subcategory.id} href={`/category/${getSubcategorySlug(subcategory.name, subcategory.id)}`}>
                    <span className="capitalize">{subcategory.name}</span>
                </Link>
            })}
        </div>
    </div>
}
