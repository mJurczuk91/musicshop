'use client'

import { Product } from "@/app/(lib)/definitions"
import { CartContext, CartContextType, CartActionTypes } from "@/app/cart/context/cartContext"
import { useContext, useEffect, useState } from "react"
import { AddToCartButton } from "./addToCartButton"

type Props = {
    product: Product,
}

export function SetAmount({ product }: Props) {
    const { cart, addToCart, getProductAmountMinusCart } = useContext(CartContext) as CartContextType;
    const [counterAmount, setCounterAmount] = useState<number>(1);
    const [message, setMessage] = useState<string | null>(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [isAddToCartDisabled, setIsAddToCartDisabled] = useState<boolean>(isProductAvailable(product))
    
    const displayTimedMessage = (message: string, ms: number) => {
        setMessage(message);
        if (timer) clearTimeout(timer);

        setTimer(setTimeout(() => {
            setMessage(null);
            setTimer(null);
        }, ms))
    }

    function isProductAvailable(product:Product):boolean  {
        return getProductAmountMinusCart(product) > 0;
    }

    useEffect(() => {
        if(isProductAvailable(product)) setIsAddToCartDisabled(false);
        else setIsAddToCartDisabled(true);
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
        displayTimedMessage('Added product to cart', 3000);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-fit flex m-2 p-2 mb-0 pb-0 select-none">
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
            <div className="h-6 w-full text-center">
                <span className="text-green-700">
                    {message}
                </span>
            </div>
        </div>
    )
}