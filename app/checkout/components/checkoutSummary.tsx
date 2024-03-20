'use client'
import { useContext } from "react";
import CheckoutItemTile from "./checkoutItemTile";
import ConfirmCheckout from "./confirmCheckout";
import { CartContext } from "@/app/providers/cartProvider";

export default function CheckoutSummary() {
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
                    cart.map(item => <CheckoutItemTile key={item.product.id} item={item} />)
                }
            </div>

            {cart.length > 0 && <ConfirmCheckout />}

        </div>
    )
}