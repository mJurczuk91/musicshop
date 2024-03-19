import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJwtSecretKey } from "@/app/(lib)/auth"
import { getUser } from "@/app/(lib)/services/user";


export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await getUser(body.email, body.password);

  if (user) {
    const token = await new SignJWT({
      id: user.id,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24hr")
      .sign(getJwtSecretKey());

    const {value: redirect} = request.cookies.get('redirectAfterLoginUrl') ?? {value: null}

    const response = NextResponse.json({
      success: true,
      status: 200,
      headers: {"content-type": "application/json",},
      redirectUrl: redirect ? redirect : `${request.nextUrl.origin}/account`,
    })

    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
    });

    redirect && response.cookies.delete('redirectAfterLoginUrl');

    return response;
  }
  return NextResponse.json({ success: false, message: 'Incorrect email and/or password' });
}
