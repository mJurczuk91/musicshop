import Link from "next/link"
import { Subcategory } from "../(lib)/definitions"

export default function CategoryGridElement({categoryName, subcategories} : {categoryName:string, subcategories:Subcategory[]}){
    return <div style={{}} className="flex justify-between p-2 border-gray-400 border-opacity-25 odd:text-right md:odd:text-left">
        <div className="flex flex-col w-full">
            <Link href={`/category/${categoryName}`} className="capitalize font-bold tracking-tight">{categoryName}</Link>
            {subcategories.map(subcategory => {
                return <Link key={subcategory.id} className="tracking-tight capitalize" href={`/category/${categoryName}/${subcategory.name}`}>{subcategory.name}</Link>
            })}
        </div>
        <img src={`/svg/${categoryName}.svg`} alt={categoryName} className="hidden md:block h-auto w-16" />
    </div>
}  