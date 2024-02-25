'use client'

import { useState } from "react"
import { CartItem } from "@/app/(lib)/definitions"

type Props = {
    addToCart: (item: CartItem) => boolean,
    removeFromCart: (item: CartItem) => boolean,
    item: CartItem,
}

type CartActionResult = {
    success: boolean,
    message: string,
}

export function ProductCounter({ addToCart, removeFromCart, item }: Props) {
    const [cartActionResult, setCartActionResult] = useState<CartActionResult | null>(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const displayMessage = (success: boolean, message: string) => {
        setCartActionResult({
            success,
            message
        })

        if (timer) clearTimeout(timer);

        setTimer(setTimeout(() => {
            setCartActionResult(null);
            setTimer(null);
        }, 2000))
    }

    const addOne = () => {
        const success = addToCart({
            product: item.product,
            amount: 1,
        });

        displayMessage(success, success ? 'Item added' : 'Not enough items in stock')
    }

    const removeOne = () => {
        if (item.amount > 1) {
            removeFromCart({
                product: item.product,
                amount: 1,
            });
            displayMessage(true, 'Item removed')

        } else if (cartActionResult?.message === 'Click again to remove last item') removeFromCart(item);

        else displayMessage(false, 'Click again to remove last item')
    }

    return (
        <div>
            <div>
                <div className="flex ">
                    <div className="flex w-12 justify-center items-center p-2 border-2 border-black border-opacity-40">
                        <span>
                            {item.amount}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <button
                            onClick={() => addOne()}
                            className="px-2 border-black border-opacity-40 border-t-2 border-r-2 border-b-2 font-bold"
                        >
                            +
                        </button>

                        <button
                            onClick={() => removeOne()}
                            className="px-2 border-black border-opacity-40 border-b-2 border-r-2 font-bold"
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
            <div
                className="w-full max-w-xl">
                {cartActionResult &&
                    <div
                        className={`${cartActionResult.success ? ` text-green-700` : ` text-red-600`}
                        absolute
                `}
                    >
                        {cartActionResult.message}
                    </div>
                }
            </div>
        </div>
    )
}