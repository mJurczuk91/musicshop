import { Product } from "../(lib)/definitions";
import Link from "next/link";

export default function ProductMiniature({ name, description, image_url, price }: Product) {
    const description_short = description.length > 30 ? description.slice(0, 29) : description;

    return <div className="bg-white p-4 m-4 h-96 shadow-md flex flex-col justify-between">
        <div className="text-center flex flex-col basis-2/3 justify-between ">
            <Link href={`/product/${name}`}>
                    <img className="h-auto w-[16rem] max-w-full" src={`${image_url}`} />
            </Link>
            <Link href={`/product/${name}`}>
                    <h4 className="text-lg font-bold">{name}</h4>
            </Link>
        </div>
        <div className="w-full mt-2 text-center">
            <p className="mb-4">{description_short}</p>
            <span className="font-bold">{price}</span>
        </div>
    </div>
}