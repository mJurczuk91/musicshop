import { CartItem } from "@/app/(lib)/definitions"

type Props = {
    item: CartItem,
}

export default function CheckoutItemTile({ item }: Props) {
    return (
        <div className="flex flex-col md:flex-row w-full items-center justify-between max-w-6xl shadow-sm m-4">

            <div className="flex flex-col items-center">
                <div className="w-32 h-auto m-2">
                    <img src={item.product.imgUrlArray[0]} alt="product image" />
                </div>
            </div>

            <div className="flex flex-col items-left w-full justify-between">
                <div>
                    <p className="font-bold">
                        {item.product.name}
                    </p>
                </div>

                <div>
                    <p>
                        Amount: <span className="font-bold">{item.amount}</span>
                    </p>
                </div>

                <div>
                    <p>Cost per item: <span className="font-bold">${item.product.price}</span></p>
                </div>

                <div>
                    <p>
                        Total: <span className="font-bold">${(item.amount * parseInt(item.product.price)).toFixed(2)}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}