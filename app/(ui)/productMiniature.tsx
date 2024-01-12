import { Product } from "../(lib)/definitions";
import Link from "next/link";
import { getProductSlug } from "../(lib)/helpers";

type Props = {
    product: Product,
}

export default function ProductMiniature({ product }: Props) {
    const description_short = product.description.slice(0, 30).trim();
    console.log(product);
    return <div className="bg-white p-4 m-4 h-96 shadow-md flex flex-col justify-between">
        <div className="text-center flex flex-col basis-2/3 justify-between ">
            <Link href={`/product/${getProductSlug(product)}`}>
                <img className="h-auto w-[16rem] max-w-full" alt="product image" src={`${product.image_url}`} />
            </Link>
            <Link href={`/product/${getProductSlug(product)}`}>
                <span className="text-lg font-bold">{product.name}</span>
            </Link>
        </div>
        <div className="w-full mt-2 text-center">
            <p className="mb-4">{description_short}</p>
            <span className="font-bold">{product.price}</span>
        </div>
    </div>
}