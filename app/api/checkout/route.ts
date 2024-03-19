import { decodeJWT, verifyJwtToken } from "@/app/(lib)/auth";
import { NextRequest, NextResponse } from "next/server";
import { orders } from "@/app/(lib)/services/orders";
import { LoginTokenPayload, OrderElement } from "@/app/(lib)/definitions";



export async function POST(request: NextRequest) {
    const { nextUrl, cookies } = request;
    const { value: token } = cookies.get("token") ?? { value: null };

    const hasVerifiedToken = token && (await verifyJwtToken(token));
    if (!hasVerifiedToken) return NextResponse.redirect(nextUrl.basePath.concat('/login'));

    const order = await request.json() as OrderElement[];
    if(order.length === 0) return NextResponse.json({
        success: false, 
        message: "The cart is empty",
    });
    
    const userInfo = decodeJWT(token) as LoginTokenPayload;
    const createOrderStatus = await orders.create(order, userInfo.id);
    return NextResponse.json({
        ...createOrderStatus, 
        message: createOrderStatus.success ? "Order placed successfuly" : "Something went wrong"
    });
}