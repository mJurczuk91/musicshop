import { Dispatch } from "react"
import { AddCartItemsAction, RemoveCartItemsAction } from "../../context/cartContext"
import { CartItem } from "@/app/(lib)/definitions"

type Props = {
    dispatch: Dispatch<AddCartItemsAction | RemoveCartItemsAction>,
    item: CartItem,
}

export function RemoveElementButton({dispatch, item}:Props){
    return (
        <div>
            <button onClick={() => dispatch({type:'remove', payload:item})}>REMOVE</button>
        </div>
    )
}