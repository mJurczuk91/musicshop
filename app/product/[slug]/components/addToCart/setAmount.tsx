'use client'

import { Product } from "@/app/(lib)/definitions"
import { CartContext, CartContextType } from "@/app/cart/context/cartContext"
import { useContext, useState } from "react"
import { AddToCartButton } from "./addToCartButton"

type Props = {
    product: Product,
}

export function SetAmount({ product }: Props) {
    const { cart, dispatch } = useContext(CartContext) as CartContextType;
    const [amount, setAmount] = useState<number>(1);

    const increaseAmount = () => {
        if (amount < product.amount) setAmount(amount + 1);
    }

    const decreaseAmount = () => {
        if (amount > 1) setAmount(amount - 1);
    }

    const addToCart = () => {
        dispatch({
            type: "add",
            payload: {
                product,
                amount: amount,
            }
        })
    }

    return (
        <div className="w-fit flex m-2 p-2 select-none">
            <div className="w-fit flex">
                <div className="flex justify-center items-center p-2 border-2 border-black border-opacity-40">
                    <span>
                        {amount}
                    </span>
                </div>
                <div>
                    <div className="flex flex-col">
                        <button
                            className="px-2 border-black border-opacity-40 border-t-2 border-r-2 border-b-2 font-bold"
                            onClick={increaseAmount}>
                            +
                        </button>
                        <button
                            className="px-2 border-black border-opacity-40 border-b-2 border-r-2 font-bold"
                            onClick={decreaseAmount}>
                            -
                        </button>
                    </div>
                </div>
            </div>
            <AddToCartButton addToCart={addToCart} />
        </div>
    )
}