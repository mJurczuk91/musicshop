'use client'

import { useContext } from "react"
import { CartContext } from "../providers/cartProvider"
import { ToastContext } from "../providers/toastProvider"

export default function Page() {
    const { cart, clearCart } = useContext(CartContext)
    const { addToast } = useContext(ToastContext);

    const handleOrderPlaced = (success: boolean, message: string) => {
        if (success) clearCart();
        addToast({message, success});
    }

    const handleClick = () => {
        fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify(cart.map(item => {
                return {
                    itemId: item.product.id,
                    itemPrice: item.product.price,
                    itemName: item.product.name,
                    itemImageUrl: item.product.imgUrlArray[0],
                    amount: item.amount,
                }
            })),
        })
        .then(response => response.json() as Promise<{success:boolean, message:string}>)
        .then(json => handleOrderPlaced(json.success, json.message));
    }

    return (
        <div>
            <button
                disabled={cart.length === 0}
                onClick={handleClick}
                className={`
                        ${cart.length === 0 ? `bg-gray-400 hover:bg-gray-500` : `bg-tangerine-400 hover:bg-tangerine-500`}
                        py-2 px-4 ml-2 h-fit font-bold text-white`}>
                Confirm purchase
            </button>
        </div>
    )
}