'use client'
import { useEffect, useReducer } from "react"
import { cartReducer, CartContext, CartActionTypes } from "./cart/context/cartContext"
import { } from "./cart/context/cartContext"
import { CartItem, Product } from "./(lib)/definitions"


type Props = {
    children: React.ReactNode,
}

export function Providers({ children }: Props) {
    const [cartState, cartDispatch] = useReducer(cartReducer, null);

    const getAmountInCart = (itemId: string): number | undefined => {
        const amount = cartState?.find(i => itemId === i.product.id)?.amount;
        return amount;
    }

    const addToCart = (item: CartItem): boolean => {
        const amountInCart = getAmountInCart(item.product.id);
        if (amountInCart) {
            if (amountInCart + item.amount <= item.product.amount) {
                cartDispatch({
                    type: CartActionTypes.add,
                    payload: item,
                });
                return true;
            }
            return false;
        }
        if (item.amount <= item.product.amount) {
            cartDispatch({
                type: CartActionTypes.add,
                payload: item,
            });
            return true;
        }
        return false;
    }

    const removeFromCart = (item:CartItem) => {
        cartDispatch({
            type: CartActionTypes.remove,
            payload: item,
        });
        return true;
    }

    const getProductAmountMinusCart = (product:Product):number => {
        const inCart = getAmountInCart(product.id);
        return inCart ? product.amount - inCart : product.amount;
    }

    const isProductInCart = (productId:string):boolean => {
        if(cartState?.find(i => i.product.id === productId)) return true;
        return false;
    }

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
        <CartContext.Provider value={{ cart: cartState, addToCart, removeFromCart, isProductInCart, getAmountInCart, getProductAmountMinusCart }}>
            {children}
        </CartContext.Provider>
    )
}