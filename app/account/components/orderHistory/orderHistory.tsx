import { orders } from "@/app/(lib)/services/orders";
import { cookies } from "next/headers";
import { decodeJWT } from "@/app/(lib)/auth/auth";
import { LoginTokenPayload } from "@/app/(lib)/definitions";
import OrderElementDisplay from "./orderElementDisplay";

type Props = {
    user: LoginTokenPayload,
}

export default async function OrderHistory({user}:Props) {
    const orderList = await orders.getByUserId(user.id);
    const noOrders = orderList.data.length === 0;
    return (
        <div className="mt-4">
            <div className="flex flex-col items-center">
                <p className="text-lg font-bold tracking-tight">
                    Order history:
                </p>
                {noOrders && <p>You haven't placed any orders yet.</p>}
                {!noOrders && 
                <div>
                    {
                        orderList.data.map(order => {
                            return <OrderElementDisplay key={order.id} order={order} />
                        })
                    }
                </div>}
            </div>
        </div>
    )
}