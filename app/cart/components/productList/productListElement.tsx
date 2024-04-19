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
        <div className="flex flex-col w-full p-8 lg:p-16 max-w-xl items-center justify-between border-b-2 border-black border-opacity-10">
            <div className="flex w-full items-center justify-between">
                <img
                    className="h-28"
                    src={product.imgUrlArray[0]}
                    alt="product image"
                />
                <div className="flex flex-col">
                    <p className="text-lg font-bold">
                        {product.name}
                    </p>

                    <p className="text-sm tracking-tight text-gray-600 text-right">
                        ${product.price}
                    </p>
                </div>
            </div>
            <div className="flex w-full justify-between">
                <div className="flex basis-1/3">
                    <ProductCounter addToCart={addToCart} removeFromCart={removeFromCart} item={{ product, amount }} />
                </div>
                <div className="flex flex-col justify-center items-center basis-1/3">
                    <span>
                        ${(parseFloat(product.price) * amount).toFixed(2)}
                    </span>
                </div>
                <div className="basis-1/3 w-full">
                    <RemoveElementButton removeFromCart={removeFromCart} item={{ product, amount }} />
                </div>
            </div>
        </div>
    )
}