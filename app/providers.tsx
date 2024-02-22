'use client'
import { useEffect, useReducer, useState } from "react"
import { cartReducer, CartContext, CartAction, CartActionTypes} from "./cart/context/cartContext"
import {  } from "./cart/context/cartContext"


type Props = {
    children: React.ReactNode,
}

export function Providers({ children }: Props) {
    const [cartState, cartDispatch] = useReducer(cartReducer, null);

    useEffect(() => {
        if (localStorage.getItem("cart")) {
            const payload = JSON.parse(localStorage.getItem("cart")!);
            cartDispatch({
                type: "init",
                payload: payload
            });
        }
    }, []);

    useEffect(() => {
        if (JSON.stringify(cartState) !== localStorage.getItem("cart")) {
            localStorage.setItem("cart", JSON.stringify(cartState));
        }
    }, [cartState]);
    
    return (
        <CartContext.Provider value={{ cart: cartState, dispatch: cartDispatch }}>
            {children}
        </CartContext.Provider>
    )
}