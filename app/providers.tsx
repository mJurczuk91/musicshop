'use client'
import { useReducer } from "react"
import { cartReducer } from "./cart/context/cartContext"
import { CartContext } from "./cart/context/cartContext"

type Props = {
    children: React.ReactNode,
}

export function Providers({ children }: Props) {
    const [cartState, cartDispatch] = useReducer(cartReducer, null);
    
    return (
        <CartContext.Provider value={{ cart: cartState, dispatch: cartDispatch }}>
            {children}
        </CartContext.Provider>
    )
}