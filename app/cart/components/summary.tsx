'use client'
import { useContext } from "react";
import { CartContext } from "@/app/providers/cartProvider";

export function Summary() {
    const { cart } = useContext(CartContext);
    let totalCost = 0;
    let totalItems = 0;
    if (cart) for (let item of cart) {
        totalCost += item.amount * Number(item.product.price);
        totalItems += item.amount;
    }
    return (
        <div className={`max-w-6xl flex justify-center items-center`}>
            <div className=" text-right">
                <div className=" m-2">
                    <span>
                        Items total: {totalItems}
                    </span>
                </div>
                <div className=" m-2">
                    <span>
                        Total cost: ${totalCost.toFixed(2)}
                    </span>
                </div>
            </div>
            <button
                disabled={totalItems === 0}
                onClick={() => console.log('clicked checkout')}
                className={`
                        ${totalItems === 0 ? `bg-gray-400 hover:bg-gray-500` : `bg-tangerine-400 hover:bg-tangerine-500`}
                        py-2 px-4 ml-2 h-fit font-bold text-white`}>
                Checkout
            </button>
        </div>
    )
}