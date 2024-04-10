import Link from "next/link"
import { Category, Subcategory } from "../(lib)/definitions"
import { getCategorySlug, getSubcategorySlug } from "../(lib)/helpers"

export type Props = {
    category: Category,
}

export default function CategoryGridElement({category} : Props){
    return <div style={{}} className="flex justify-between p-2 border-gray-400 border-opacity-25 odd:text-right md:odd:text-left">
        <div className="flex flex-col w-full">
            <Link href={`/category/${getCategorySlug(category.name, category.id)}`} className="capitalize font-bold tracking-tight">{category.name}</Link>
            {category.subcategories.slice(0,3).map(subcategory => {
                return <Link key={subcategory.id} className="tracking-tight capitalize" href={`/category/${getSubcategorySlug(subcategory.name, subcategory.id)}`}>{subcategory.name}</Link>
            })}
        </div>
        <img src={`/svg/${category.name}.svg`} alt={category.name} className="hidden md:block h-auto w-16" />
    </div>
}  