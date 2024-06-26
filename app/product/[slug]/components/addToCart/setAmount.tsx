'use client'

import { Product } from "@/app/(lib)/definitions"
import { CartContext } from "@/app/providers/cartProvider";
import { useContext, useEffect, useState } from "react"
import { AddToCartButton } from "./addToCartButton"
import { ToastContext } from "@/app/providers/toastProvider";

type Props = {
    product: Product,
}

export function SetAmount({ product }: Props) {
    const { addToast } = useContext(ToastContext);
    const { cart, addToCart, getProductAmountMinusCart } = useContext(CartContext);
    const [counterAmount, setCounterAmount] = useState<number>(1);
    const [isAddToCartDisabled, setIsAddToCartDisabled] = useState<boolean>(getProductAmountMinusCart(product) > 0)

    useEffect(() => {
        if (getProductAmountMinusCart(product) > 0) setIsAddToCartDisabled(false);
        else setIsAddToCartDisabled(true);
    }, [cart]);

    const increaseAmount = () => {
        if (counterAmount < getProductAmountMinusCart(product)) setCounterAmount(counterAmount + 1);
        else addToast({
            message: `Can't increase amount, not enough ${product.name} in stock`,
            success: false,
        })
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
        <div className="flex flex-col items-left p-4 mx-4 my-8">
            <div className="w-fit flex select-none">
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
        </div>
    )
}