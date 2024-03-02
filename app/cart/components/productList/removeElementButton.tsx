import { CartItem } from "@/app/(lib)/definitions"

type Props = {
    removeFromCart: (item:CartItem)=>void,
    item: CartItem,
}

export function RemoveElementButton({removeFromCart, item}:Props){
    return (
        <div>
            <button onClick={() => removeFromCart(item)}>REMOVE</button>
        </div>
    )
}