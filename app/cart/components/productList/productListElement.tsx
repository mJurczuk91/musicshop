'use client'

import { CartItem } from "@/app/(lib)/definitions"
import Link from "next/link"
import { getProductSlug } from "@/app/(lib)/helpers"
import { ProductCounter } from "./productCounter"
import { RemoveElementButton } from "./removeElementButton"

type Props = {
    item: CartItem,
    addToCart: (item: CartItem) => boolean,
    removeFromCart: (item: CartItem) => boolean,
}

export function ProductListElement({ item: { product, amount }, addToCart, removeFromCart }: Props) {
    return (
        <div className="flex w-full max-w-6xl items-center justify-between border-b-2 border-black border-opacity-10">

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

            <ProductCounter addToCart={addToCart} removeFromCart={removeFromCart} item={{ product, amount }} />

            <span>
                ${product.price}
            </span>

            <RemoveElementButton removeFromCart={removeFromCart} item={{ product, amount }} />
        </div>
    )
}