'use client'
import { useContext } from "react";
import { CartContext, CartContextType } from "../context/cartContext";

export function Summary() {
    const {cart} = useContext(CartContext) as CartContextType;
    let totalCost = 0;
    let totalItems = 0;
    if(cart) for(let item of cart){
        totalCost += item.amount * Number(item.product.price);
        totalItems += item.amount;
    }
    return (
        <div className=''>
            {totalItems}
            {totalCost}
        </div>
    )
}