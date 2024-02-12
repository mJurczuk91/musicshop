'use client'
import { useReducer } from "react"
import { CartState } from "./cart/context/cartContext"
import { cartReducer } from "./cart/context/cartContext"
import { CartContext } from "./cart/context/cartContext"

type Props = {
    children: React.ReactNode,
}

export function Providers({ children }: Props) {
    const initialState: CartState = [
        {
            product: {
                id: '1',
                name: 'booster929',
                category: 'drums',
                categoryId: '1',
                subcategory: 'e-drums',
                subcategoryId: '2',
                price: '200.00',
                amount: 4,
                description: 'description',
                imgUrlArray: [
                    'https://m-jurczuk.pl/uploads/drums5_2a7ca187ff.jpg',
                    'https://m-jurczuk.pl/uploads/drums1_3f66fa7a41.jpg',
                ],
                details: [
                    { key: 'klucz', value: 'vartosc' },
                ]
            },
            amount: 2,
        },
        {
            product: {
                id: '2',
                name: 'booster444',
                category: 'drums',
                categoryId: '1',
                subcategory: 'e-drums',
                subcategoryId: '2',
                price: '200.00',
                amount: 4,
                description: 'description',
                imgUrlArray: [
                    'https://m-jurczuk.pl/uploads/drums5_2a7ca187ff.jpg',
                    'https://m-jurczuk.pl/uploads/drums1_3f66fa7a41.jpg',
                ],
                details: [
                    { key: 'klucz', value: 'vartosc' },
                ]
            },
            amount: 2,
        }
    ];

    const [cartState, cartDispatch] = useReducer(cartReducer, initialState)

    return (
        <CartContext.Provider value={{ cart: cartState, dispatch: cartDispatch }}>
            {children}
        </CartContext.Provider>
    )
}