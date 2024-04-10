import { Product } from "@/app/(lib)/definitions";
import { getProductSlug } from "@/app/(lib)/helpers";
import Link from "next/link";

type Props = {
    product?: Product,
}

export default function SearchResult({ product }: Props) {
    return (
        <div className="w-full max-w-sm h-16 p-2 bg-white border-tangerine-500 border-t border-x last-of-type:border-b">
            {product ?
                <Link
                href={`/product/${getProductSlug(product)}`}>
                    <div className="flex justify-between text-center items-center">
                        <img className="h-12" src={product.imgUrlArray[0]} alt="product miniature"></img>
                        <p >{product.name}</p>
                    </div>
                </Link>
                :
                <div 
                className="w-72 h-16 text-center p-2">
                    <p>No results with that name</p>
                </div>
            }
        </div>
    )
}