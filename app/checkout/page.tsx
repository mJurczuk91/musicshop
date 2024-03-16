'use client'

import { useContext } from "react"
import { CartContext } from "../providers/cartProvider"

export default function Page() {
    const { cart } = useContext(CartContext)
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
    }
    return (
        <div>
            <button onClick={handleClick}>CLICK ME</button>
        </div>
    )
}