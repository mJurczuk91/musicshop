import { Product } from "@/app/(lib)/definitions"
import { Price } from "./price"
import { SetAmount } from "./setAmount"
import { Availability } from "./availability"

type Props = {
    product: Product,
}

export function AddToCart({ product }: Props) {
    return (
        <div className="w-fit h-56 flex flex-col justify-evenly border-black border-opacity-40 border-2 items-center shadow-lg">
            <div className="w-full border-black border-opacity-40 border-b-2">
                <Price price={product.price} />
            </div>
            <div className="w-full border-black border-opacity-40 border-b-2">
                <SetAmount product={product} />
            </div>
            <div>
                <Availability amount={product.amount} />
            </div>
        </div>
    )
}