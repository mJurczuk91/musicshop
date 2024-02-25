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

    const displayMessage = (success:boolean, message:string) => {
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

        } else if(cartActionResult?.message === 'Click again to remove last item') removeFromCart(item);
        
        else displayMessage(false, 'Click again to remove last item')
    }

    return (
        <div>
            <span>
                {item.amount}
            </span>
            <div className="">
                <button
                    onClick={() => addOne()}
                    className=""
                >
                    +
                </button>

                <button
                    onClick={() => removeOne()}
                    className=""
                >
                    -
                </button>
            </div>
            {cartActionResult &&
                <div
                    className={`${cartActionResult.success ? ` text-green-700` : ` text-red-600`}
                
                `}
                >
                    {cartActionResult.message}
                </div>}
        </div>
    )
}