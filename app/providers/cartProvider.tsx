'use client'
import { createContext,useContext, useEffect, useState } from "react"
import { CartItem, Product } from "../(lib)/definitions"
import { ToastContext } from "./toastProvider"
import Toast from "../(ui)/toast/toast"

export type CartContextType = {
    cart: CartItem[],
    addToCart: (item: CartItem) => void,
    removeFromCart: (item: CartItem) => void,
    getAmountInCart: (productId: string) => number | undefined,
    getProductAmountMinusCart: (product: Product) => number,
    isProductInCart: (productId: string) => boolean,
}

export const CartContext = createContext<CartContextType>({
    cart: [] as CartItem[],
    addToCart: (item: CartItem) => {},
    removeFromCart: (item: CartItem) => {},
    getAmountInCart: (productId: string) => undefined,
    getProductAmountMinusCart: (product: Product) => 1,
    isProductInCart: (productId: string) => false,
});


type Props = {
    children: React.ReactNode,
}

export function CartProvider({ children }: Props) {
    const {addToast} = useContext(ToastContext);
    const [cart, setCart] = useState<CartItem[]>([])

    const getAmountInCart = (itemId: string): number | undefined => {
        return cart.find(i => itemId === i.product.id)?.amount;
    }

    const addToCart = (newItem: CartItem) => {
        let foundInCart = false;
        let addItemSuccess = false;
        const newCart: CartItem[] = [];

        for (let oldItem of cart) {

            if (oldItem.product.id !== newItem.product.id) {
                newCart.push(oldItem);
                continue;
            }

            foundInCart = true;
            if (oldItem.amount + newItem.amount <= oldItem.product.amount) {
                newCart.push({
                    product: oldItem.product,
                    amount: oldItem.amount + newItem.amount
                })
                addItemSuccess = true;
                continue;
            }

            newCart.push(oldItem);
        }

        if (!foundInCart && newItem.amount <= newItem.product.amount) {
            newCart.push(newItem);
            addItemSuccess = true;
        }

        if(addItemSuccess) {
            addToast({
                message: `item added ${cart.length}`,
                success: addItemSuccess
            })
        }

        setCart(newCart);
    }

    const removeFromCart = (newItem: CartItem) => {
        const newCart = cart.flatMap(cartItem => {
            if (cartItem.product.id !== newItem.product.id) return cartItem;
            if (cartItem.amount - newItem.amount < 1) return [];
            return {
                product: cartItem.product,
                amount: cartItem.amount - newItem.amount,
            }
        })
        setCart(newCart);
        addToast({
            message: 'Removed item',
            success: true,
        })
    }

    const getProductAmountMinusCart = (product: Product): number => {
        const inCart = getAmountInCart(product.id);
        return inCart ? product.amount - inCart : product.amount;
    }

    const isProductInCart = (productId: string): boolean => {
        if (cart.find(i => i.product.id === productId)) return true;
        return false;
    }

    useEffect(() => {
        if (localStorage.getItem("cart")) {
            const foundState = JSON.parse(localStorage.getItem("cart")!);
            setCart(foundState);
        }
    }, []);

    useEffect(() => {
        if (JSON.stringify(cart) !== localStorage.getItem("cart")) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isProductInCart, getAmountInCart, getProductAmountMinusCart }}>
            {children}
        </CartContext.Provider>
    )
}