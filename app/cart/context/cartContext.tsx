import { CartItem, Product } from "@/app/(lib)/definitions";
import { Dispatch, createContext, useReducer } from "react";

export enum CartActionTypes {
    'add'='add', 'remove'="remove"
}

export type CartAction = {
    type: CartActionTypes,
    payload: {
        product: Product,
        amount: number,
    },
}

export type InitCart = {
    type: 'init',
    payload: CartState,
}


export type CartState = CartItem[] | null;

export function cartReducer(state: CartState, action: CartAction|InitCart): CartState {
    switch (action.type) {
        case 'add': {
            if (!state) return [action.payload];
            if (state.find(i => i.product.id === action.payload.product.id)) {
                return state.map(el => el.product.id === action.payload.product.id ?
                    { product: el.product, amount: el.amount + action.payload.amount }
                    :
                    el
                )
            }
            return state.concat(action.payload);
        }
        case 'remove': {
            if (!state || !state.find(el => el.product.id === action.payload.product.id)) return state;
            const newState = state.flatMap(el => {
                if (el.product.id !== action.payload.product.id) return el;
                if (el.amount - action.payload.amount < 1) return [];
                else return { product: el.product, amount: el.amount - action.payload.amount }
            });
            return newState.length === 0 ? null : newState;
        }
        case 'init': {
            if(!state) return action.payload;
            return state;
        }
        default: return state;
    }
}

export type CartContextType = {
    cart: CartState,
    addToCart: (item:CartItem)=>boolean,
    removeFromCart: (item:CartItem)=>boolean,
    getAmountInCart: (productId: string)=>number|undefined,
    getProductAmountMinusCart: (product: Product) => number,
    isProductInCart: (productId: string) => boolean,
}

export const CartContext = createContext<CartContextType | undefined>(undefined);