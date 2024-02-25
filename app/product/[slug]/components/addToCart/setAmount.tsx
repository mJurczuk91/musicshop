'use client'

import { Product } from "@/app/(lib)/definitions"
import { CartContext, CartContextType, CartActionTypes } from "@/app/cart/context/cartContext"
import { useContext, useEffect, useState } from "react"
import { AddToCartButton } from "./addToCartButton"

type Props = {
    product: Product,
}

export function SetAmount({ product }: Props) {
    const { cart, addToCart, getProductAmountMinusCart, isProductInCart } = useContext(CartContext) as CartContextType;
    const [counterAmount, setCounterAmount] = useState<number>(1);

    const [isAddToCartDisabled, setIsAddToCartDisabled] = useState<boolean>(false)

    useEffect(() => {
        if (isProductInCart(product.id)) {
            if (getProductAmountMinusCart(product) < 1) setIsAddToCartDisabled(true);
            else setIsAddToCartDisabled(false);
        }
    }, [cart]);

    const increaseAmount = () => {
        if (counterAmount < getProductAmountMinusCart(product)) setCounterAmount(counterAmount + 1);
    }

    const decreaseAmount = () => {
        if (counterAmount > 1) setCounterAmount(counterAmount - 1);
    }

    const handleAddToCartClick = () => {
        addToCart({
            product,
            amount: counterAmount,
        })
    }

    return (
        <div className="w-fit flex m-2 p-2 select-none">
            <div className="w-fit flex">
                <div className="flex w-12 justify-center items-center p-2 border-2 border-black border-opacity-40">
                    <span>
                        {counterAmount}
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
            <AddToCartButton addToCart={handleAddToCartClick} disabled={isAddToCartDisabled} />
        </div>
    )
}