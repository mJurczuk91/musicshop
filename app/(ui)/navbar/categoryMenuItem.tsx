import Link from "next/link"
import { Category } from "@/app/(lib)/definitions"
import { getCategorySlug, getSubcategorySlug } from "@/app/(lib)/helpers"

type Props = {
    category: Category,
}

export default function CategoryMenuItem({ category }: Props) {
    return <div className="group">
        <Link className="mx-4 capitalize text-white border-tangerine-500 group-hover:border-b-2" href={`/category/${getCategorySlug(category.name, category.id)}`}>
            {category.name}
        </Link>
        <div className="invisible absolute flex flex-col p-6 bg-darkcyan-500 shadow-md group-hover:visible">
            {category.subcategories.map((subcategory) => {
                return (
                    <Link
                        key={subcategory.id}
                        href={`/category/${getSubcategorySlug(subcategory.name, subcategory.id)}`}
                        className="border-b-2 border-darkcyan-500 hover:border-tangerine-500"
                    >
                        <span className="capitalize">{subcategory.name}</span>
                    </Link>)
            })}
        </div>
    </div>
}
