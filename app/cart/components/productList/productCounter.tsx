'use client'

import { Dispatch } from "react"
import { CartAction } from "../../context/cartContext"
import { CartActionTypes } from "../../context/cartContext"
import { CartItem } from "@/app/(lib)/definitions"

type Props = {
    dispatch: Dispatch<CartAction>,
    item: CartItem,
}

export function ProductCounter({dispatch, item}:Props){
    return (
        <div>
            <span>
                {item.amount}
            </span>
            <div className="">
                <button onClick={()=>{dispatch({type:CartActionTypes.add, payload:{product: item.product, amount: 1}})}}>+</button>
                <button onClick={()=>{if(item.amount > 1) dispatch({type:CartActionTypes.remove, payload:{product: item.product, amount: 1}})}}>-</button>
            </div>
        </div>
    )
}