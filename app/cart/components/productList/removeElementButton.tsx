import { Dispatch } from "react"
import { CartAction} from "../../context/cartContext"
import { CartActionTypes } from "../../context/cartContext"
import { CartItem } from "@/app/(lib)/definitions"

type Props = {
    dispatch: Dispatch<CartAction>,
    item: CartItem,
}

export function RemoveElementButton({dispatch, item}:Props){
    return (
        <div>
            <button onClick={() => dispatch({type:CartActionTypes.remove, payload:item})}>REMOVE</button>
        </div>
    )
}