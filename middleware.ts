import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from '@/app/(lib)/auth'

export async function middleware(request:NextRequest) {

  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isLoginPage = request.nextUrl.href.includes('/login');

  if(hasVerifiedToken && isLoginPage){
    return NextResponse.redirect(new URL(`${request.nextUrl.origin}/account`))
  };

  if (!hasVerifiedToken && !isLoginPage) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);
    const response = NextResponse.redirect(
      new URL(`${request.nextUrl.origin}/login`)
    );
    response.cookies.set({
        name: 'redirectAfterLoginUrl',
        value: url,
    });
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}
export const config = { matcher: ["/account/:path*", "/checkout:path*", "/login"] };