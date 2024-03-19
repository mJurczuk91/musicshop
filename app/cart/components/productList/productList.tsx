'use client'

import { useContext } from "react"
import { CartContext } from "@/app/providers/cartProvider";
import { ProductListElement } from "./productListElement";

export function ProductList() {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    return (
        <div className="flex flex-col items-center">
            {cart.length === 0 &&
                <div>
                    <p>
                        Cart is currently empty.
                    </p>
                </div>
            }
            {cart && cart.map(el => <ProductListElement key={el.product.id} item={el} addToCart={addToCart} removeFromCart={removeFromCart} />)}
        </div>
    )
}