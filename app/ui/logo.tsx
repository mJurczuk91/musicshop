import Link from "next/link";

export default function Logo() {
    return <Link className="max-w-fit" href="/">
        <h1 className=" text-4xl font-bold tracking-tighter max-w-fit">
            <span className="text-orange-400">Music</span>Shop
        </h1>
    </Link>
}