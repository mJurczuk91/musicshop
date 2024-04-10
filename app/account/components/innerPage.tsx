import { decodeJWT } from "@/app/(lib)/auth/auth";
import { LoginTokenPayload } from "@/app/(lib)/definitions";
import { cookies } from "next/headers";
import OrderHistory from "./orderHistory/orderHistory";
import AccountInfo from "./accountInfo";

export default function InnerPage(){
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if(!token) {
        throw new Error('not logged in');
    }
    const user = decodeJWT(token) as LoginTokenPayload;
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <AccountInfo user={user} />
            <OrderHistory user={user} />
        </div>
    )
}