'use client'

import { useContext } from "react"
import { CartContext, CartContextType } from "../../context/cartContext"
import { ProductListElement } from "./productListElement";

export function ProductList(){
    const {cart, dispatch} = useContext(CartContext) as CartContextType;
    return (
        <div>
            {!cart && <span>Empty</span>}
            {cart && cart.map(el => <ProductListElement key={el.product.id} item={el} dispatch={dispatch} />)}
        </div>
    )
}