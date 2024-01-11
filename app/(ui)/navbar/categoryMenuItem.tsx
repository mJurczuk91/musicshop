import Link from "next/link"
import { Category } from "@/app/(lib)/definitions"

type Props = {
    category: Category,
}

export default function CategoryMenuItem({category:{ name, subcategories }}:Props) {
    return <div className="group">
        <Link className="mx-4" href={`category`}>
            {name}
        </Link>
        <div className="invisible absolute flex flex-col p-6 bg-white shadow-md group-hover:visible">
            {subcategories.map((item) => {
                return <Link key={item} href={`/category`}>
                    <span className="capitalize">{item}</span>
                </Link>
            })}
        </div>
    </div>
}
