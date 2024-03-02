'use client'

import { CartItem } from "@/app/(lib)/definitions"

type Props = {
    addToCart: (item: CartItem) => void,
    removeFromCart: (item: CartItem) => void,
    item: CartItem,
}

export function ProductCounter({ addToCart, removeFromCart, item }: Props) {

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
        }
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
        </div>
    )
}