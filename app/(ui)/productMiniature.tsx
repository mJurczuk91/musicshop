import { Product } from "../(lib)/definitions";
import Link from "next/link";

type Props = {
    product: Product,
}

export default function ProductMiniature({ product: { name, price, description, image_url } }: Props) {
    const description_short = description.slice(0, 30).trim();

    return <div className="bg-white p-4 m-4 h-96 shadow-md flex flex-col justify-between">
        <div className="text-center flex flex-col basis-2/3 justify-between ">
            <Link href={`/product/${name}`}>
                <img className="h-auto w-[16rem] max-w-full" alt="product image" src={`${image_url}`} />
            </Link>
            <Link href={`/product/${name}`}>
                <span className="text-lg font-bold">{name}</span>
            </Link>
        </div>
        <div className="w-full mt-2 text-center">
            <p className="mb-4">{description_short}</p>
            <span className="font-bold">{price}</span>
        </div>
    </div>
}