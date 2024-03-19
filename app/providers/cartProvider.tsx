'use client'
import { createContext,useContext, useEffect, useState } from "react"
import { CartItem, Product } from "../(lib)/definitions"
import { ToastContext } from "./toastProvider"

export type CartContextType = {
    cart: CartItem[],
    addToCart: (item: CartItem) => void,
    removeFromCart: (item: CartItem) => void,
    getAmountInCart: (productId: string) => number | undefined,
    getProductAmountMinusCart: (product: Product) => number,
    isProductInCart: (productId: string) => boolean,
    clearCart: ()=>void,
}

export const CartContext = createContext<CartContextType>({
    cart: [] as CartItem[],
    addToCart: (item: CartItem) => {},
    removeFromCart: (item: CartItem) => {},
    getAmountInCart: (productId: string) => undefined,
    getProductAmountMinusCart: (product: Product) => 1,
    isProductInCart: (productId: string) => false,
    clearCart: ()=>{},
});


type Props = {
    children: React.ReactNode,
}

export function CartProvider({ children }: Props) {
    const {addToast} = useContext(ToastContext);
    const [cart, setCart] = useState<CartItem[]>([]);

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

        const toastMessage = addItemSuccess ? `Added ${newItem.amount}x ${newItem.product.name} to cart` : `Not enough ${newItem.product.name} in stock`;
        addToast({
            message: toastMessage,
            success: addItemSuccess,
        })

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const removeFromCart = (itemToRemove: CartItem) => {
        const newCart = cart.flatMap(cartItem => {
            if (cartItem.product.id !== itemToRemove.product.id) return cartItem;
            if (cartItem.amount - itemToRemove.amount < 1) return [];
            return {
                product: cartItem.product,
                amount: cartItem.amount - itemToRemove.amount,
            }
        })
        setCart(newCart);
        addToast({
            message: `Removed ${itemToRemove.amount}x ${itemToRemove.product.name} from cart`,
            success: true,
        });
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const getProductAmountMinusCart = (product: Product): number => {
        const inCart = getAmountInCart(product.id);
        return inCart ? product.amount - inCart : product.amount;
    }

    const isProductInCart = (productId: string): boolean => {
        if (cart.find(i => i.product.id === productId)) return true;
        return false;
    }

    const clearCart = () => {
        setCart([] as CartItem[]);
    }

    useEffect(() => {
        if (cart.length === 0 && localStorage.getItem("cart")) {
            const foundState = JSON.parse(localStorage.getItem("cart")!);
            if(foundState.length > 0){
                setCart(foundState);
            }
        }
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isProductInCart, getAmountInCart, getProductAmountMinusCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}