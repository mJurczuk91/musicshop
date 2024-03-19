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
        const storage = localStorage.getItem('cart');
        const oldCart = storage ? JSON.parse(storage) as CartItem[] : null;

        let foundInCart = false;
        let addItemSuccess = false;
        const newCart: CartItem[] = [];

        if((!oldCart || oldCart.length === 0) && newItem.amount <= newItem.product.amount){
            newCart.push(newItem);
            addItemSuccess = true;
        } else {
            for (let oldItem of oldCart!) {

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
        }

        const toastMessage = addItemSuccess ? `Added ${newItem.amount}x ${newItem.product.name} to cart` : `Not enough ${newItem.product.name} in stock`;
        addToast({
            message: toastMessage,
            success: addItemSuccess,
        })

        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    }

    const removeFromCart = (itemToRemove: CartItem) => {
        const storage = localStorage.getItem('cart');
        const oldCart = storage ? JSON.parse(storage) as CartItem[] : null;
        let message = '';
        let success = false;
        if(!oldCart || oldCart.find(item => item.product.id !== itemToRemove.product.id)){
            message = `${itemToRemove.product.name} not present in cart`
        } else {
            const newCart = oldCart.flatMap(cartItem => {
                if (cartItem.product.id !== itemToRemove.product.id) return cartItem;
                if (cartItem.amount - itemToRemove.amount < 1) return [];
                return {
                    product: cartItem.product,
                    amount: cartItem.amount - itemToRemove.amount,
                }
            })
            localStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
            message = `Removed ${itemToRemove.amount}x ${itemToRemove.product.name} from cart`;
        }
        addToast({message,success});
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
        localStorage.removeItem('cart');
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