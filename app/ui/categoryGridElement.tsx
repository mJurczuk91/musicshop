import Link from "next/link"

export default function CategoryGridElement({name, subcategories} : {name:string, subcategories:string[]}){
    return <div style={{}} className="flex justify-between p-2 border-gray-400 border-opacity-25 odd:ml-4 even:mr-4 lg:mx-0 lg:first:border-r-0 lg:first:border-b-0 lg:last:border-t-0 lg:m-4 lg:p-4 lg:last:pr-0 lg:first:pl-0">
        <div className="flex flex-col">
            <Link href={`/category/${name}`} className=" font-bold tracking-tight">{name}</Link>
            {subcategories.map(item => {
                item[0].toUpperCase();
                return <Link className="tracking-tight" href={`/category/${name}/${item}`}>{item}</Link>
            })}
        </div>
        <img src={`/svg/${name}.svg`} alt={name} className="hidden lg:block h-auto w-16" />
    </div>
}  