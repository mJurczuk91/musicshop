'use client'

import { useContext } from "react"
import { CartContext } from "../providers/cartProvider"
import ConfirmCheckout from "./components/confirmCheckout"
import CheckoutItemTile from "./components/checkoutItemTile"

export default function Page() {
    const { cart } = useContext(CartContext)

    return (
        <div className="flex flex-col w-full items-center">
            <p className="text-3xl tracking-tight font-bold m-4">Checkout</p>

            <div>
                {cart.length === 0 ?
                    <p>
                        Cart is empty, pick something to buy first.
                    </p>
                    :
                    cart.map( item => <CheckoutItemTile key={item.product.id} item={item} />)
                }
            </div>

            {cart.length > 0 && <ConfirmCheckout />}

        </div>
    )
}