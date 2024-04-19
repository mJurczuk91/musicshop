'use client'

import { CartItem } from "@/app/(lib)/definitions"
import { ToastContext } from "@/app/providers/toastProvider"
import { useContext } from "react"

type Props = {
    addToCart: (item: CartItem) => void,
    removeFromCart: (item: CartItem) => void,
    item: CartItem,
}

export function ProductCounter({ addToCart, removeFromCart, item }: Props) {
    const { addToast } = useContext(ToastContext);

    const addOne = () => {
        const success = addToCart({
            product: item.product,
            amount: 1,
        });
    }

    const removeOne = () => {
        if (item.amount > 1) {
            removeFromCart({
                product: item.product,
                amount: 1,
            });
        } else addToast({
            message: 'Press REMOVE button if you are sure you want to remove last item from cart',
            success: false,
        })
    }

    return (
            <div className="flex w-full justify-start my-4">
                <div className="flex">
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
    )
}