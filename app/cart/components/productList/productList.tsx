'use client'

import { useContext, useEffect, useState } from "react"
import { CartContext, CartContextType, CartAction, CartActionTypes } from "../../context/cartContext"
import { ProductListElement } from "./productListElement";
import { CartItem } from "@/app/(lib)/definitions";

export function ProductList(){
    const {cart, addToCart, removeFromCart} = useContext(CartContext) as CartContextType;
    return (
        <div>
            {!cart && <span>Empty</span>}
            {cart && cart.map(el => <ProductListElement key={el.product.id} item={el} addToCart={addToCart} removeFromCart={removeFromCart}/>)}
        </div>
    )
}