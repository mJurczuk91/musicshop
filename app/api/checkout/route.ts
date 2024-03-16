import { decodeJWT, verifyJwtToken } from "@/app/(lib)/auth";
import { NextRequest, NextResponse } from "next/server";
import { orders } from "@/app/(lib)/services/orders";
import { LoginTokenPayload, OrderElement } from "@/app/(lib)/definitions";



export async function POST(request: NextRequest) {
    const { nextUrl, cookies } = request;
    const { value: token } = cookies.get("token") ?? { value: null };
    const hasVerifiedToken = token && (await verifyJwtToken(token));

    if (!hasVerifiedToken) return NextResponse.redirect(nextUrl.basePath.concat('/login'));

    const userInfo = decodeJWT(token) as LoginTokenPayload; // { id: '3', name: 'qweqwe', iat: 1710438151, exp: 1710524551 }
    const order = await request.json() as OrderElement[];

    return NextResponse.json(await orders.create(order, userInfo.id));
}