import Link from "next/link"

export default function CategoryGridElement({name, subcategories} : {name:string, subcategories:string[]}){
    return <div className="flex justify-between m-4 p-4 last:pr-0 first:pl-0">
        <div className="flex flex-col">
            <Link href={`/category/${name}`} className=" font-bold tracking-tight">{name}</Link>
            {subcategories.map(item => {
                item[0].toUpperCase();
                return <Link className="tracking-tight" href={`/category/${name}/${item}`}>{item}</Link>
            })}
        </div>
        <img src={`/${name}.svg`} alt={name} className=" h-auto w-16" />
    </div>
}