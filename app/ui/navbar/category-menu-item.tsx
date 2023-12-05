import Link from "next/link"

export default function CategoryMenuItem({ name, subitems }: { name: string, subitems: string[] }) {
    return <div className="group">
        <Link className="mx-4" href={`category`}>
            <span className="capitalize">{name}</span>
        </Link>
        <div className="invisible absolute flex flex-col p-6 bg-white shadow-md group-hover:visible">
            {subitems.map((item) => {
                return <Link key={item} href={`/category`}>
                    <span className="capitalize">{item}</span>
                </Link>
            })}
        </div>
    </div>
}
