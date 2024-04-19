import { CartItem } from "@/app/(lib)/definitions"

type Props = {
    removeFromCart: (item:CartItem)=>void,
    item: CartItem,
}

export function RemoveElementButton({removeFromCart, item}:Props){
    return (
        <div className="w-full h-full flex flex-col justify-center items-end">
            <button onClick={() => removeFromCart(item)}>
                <img className="h-8" src="/svg/trashcan.svg" alt="" />
            </button>
        </div>
    )
}