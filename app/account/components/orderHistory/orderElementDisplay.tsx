import { OrderHistoryEntry } from "@/app/(lib)/definitions";

type Props = {
    order: OrderHistoryEntry,
}

export default function OrderElementDisplay({ order }: Props) {
    return (
        <div className="w-full h-fit flex flex-col items-center my-4 p-2">
            <div className="w-full flex flex-col items-start border border-darkcyan-600 max-w-lg bg-darkcyan-200 p-4">
                    <p>Order number: <span>{order.id}</span><br />
                    Order date: <span>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                <div className="my-2">
                    <span>Products: </span>
                    {order.products.map(product => {
                        return <div key={product.itemId}>
                            <p>Item name: {product.itemName},
                            Amount: <span>{product.amount}</span>
                            </p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}