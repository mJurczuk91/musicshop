import Link from "next/link"

export default function CategoryGridElement({name, subcategories} : {name:string, subcategories:string[]}){
    return <div style={{}} className="flex justify-between p-2 border-gray-400 border-opacity-25">
        <div className="flex flex-col">
            <Link href={`/category/${name}`} className="capitalize font-bold tracking-tight">{name}</Link>
            {subcategories.map(item => {
                return <Link key={item} className="tracking-tight capitalize" href={`/category/${name}/${item}`}>{item}</Link>
            })}
        </div>
        <img src={`/svg/${name}.svg`} alt={name} className="hidden lg:block h-auto w-16" />
    </div>
}  