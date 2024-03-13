import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJwtSecretKey } from "@/app/(lib)/auth"


export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.email === "test@test.test" && body.password === "a") {
    const token = await new SignJWT({
      username: body.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24hr")
      .sign(getJwtSecretKey());

    const {value: redirect} = request.cookies.get('redirectAfterLoginUrl') ?? {value: null}
    console.log(redirect);
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

    response.cookies.delete('redirectAfterLoginUrl');

    return response;
  }
  return NextResponse.json({ success: false, message: 'Incorrect email and/or password' });
}
