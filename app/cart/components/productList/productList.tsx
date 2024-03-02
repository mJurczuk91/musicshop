'use client'

import { useContext } from "react"
import { CartContext } from "@/app/providers/cartProvider";
import { ProductListElement } from "./productListElement";

export function ProductList(){
    const {cart, addToCart, removeFromCart} = useContext(CartContext);
    return (
        <div>
            {!cart && <span>Empty</span>}
            {cart && cart.map(el => <ProductListElement key={el.product.id} item={el} addToCart={addToCart} removeFromCart={removeFromCart}/>)}
        </div>
    )
}