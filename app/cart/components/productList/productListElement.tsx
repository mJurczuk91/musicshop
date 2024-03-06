'use client'

import { CartItem } from "@/app/(lib)/definitions"
import Link from "next/link"
import { getProductSlug } from "@/app/(lib)/helpers"
import { ProductCounter } from "./productCounter"
import { RemoveElementButton } from "./removeElementButton"

type Props = {
    item: CartItem,
    addToCart: (item: CartItem) => void,
    removeFromCart: (item: CartItem) => void,
}

export function ProductListElement({ item: { product, amount }, addToCart, removeFromCart }: Props) {
    return (
        <div className="flex w-full max-w-6xl items-center justify-between border-b-2 border-black border-opacity-10">

            <div className="basis-1/4">
                <Link href={`/product/${getProductSlug(product)}`}>
                    <div className=" flex items-center">
                        <img
                            className=" h-24"
                            src={product.imgUrlArray[0]}
                            alt="product image"
                        />
                        <span className="">
                            {product.name}
                        </span>
                    </div>
                </Link>
            </div>

            <div className="basis-1/4 flex justify-center">
                <ProductCounter addToCart={addToCart} removeFromCart={removeFromCart} item={{ product, amount }} />
            </div>

            <div className="basis-1/4 flex justify-center">
                <span>
                    ${product.price}
                </span>
            </div>

            <div className="basis-1/4 flex justify-end">
                <RemoveElementButton removeFromCart={removeFromCart} item={{ product, amount }} />
            </div>
        </div>
    )
}