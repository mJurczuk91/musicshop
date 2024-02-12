import { CartItem } from "@/app/(lib)/definitions"
import { Dispatch } from "react"
import { AddCartItemsAction, RemoveCartItemsAction } from "../../context/cartContext"
import Link from "next/link"
import { getProductLink } from "@/app/(lib)/helpers"
import { ProductCounter } from "./productCounter"
import { RemoveElementButton } from "./removeElementButton"

type Props = {
    item: CartItem,
    dispatch: Dispatch<AddCartItemsAction | RemoveCartItemsAction>,
}

export function ProductListElement({ item:{product, amount}, dispatch }: Props) {
    return (
        <div className="flex w-full max-w-6xl items-center justify-between">

            <img
                className=" h-24"
                src={product.imgUrlArray[0]} 
                alt="product image"
            />

            <Link href={getProductLink(product)}>
                <span className="">
                    {product.name}
                </span>
            </Link>

            <ProductCounter dispatch={dispatch} item={{product, amount}} />

            <div>
                <span>
                    ${product.price}
                </span>
            </div>

            <RemoveElementButton dispatch={dispatch} item={{product, amount}} />
        </div>
    )
}