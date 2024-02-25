import { CartItem } from "@/app/(lib)/definitions"

type Props = {
    removeFromCart: (item:CartItem)=>boolean,
    item: CartItem,
}

export function RemoveElementButton({removeFromCart, item}:Props){
    return (
        <div>
            <button onClick={() => removeFromCart(item)}>REMOVE</button>
        </div>
    )
}