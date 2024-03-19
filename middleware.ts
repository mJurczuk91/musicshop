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

  if (
    !hasVerifiedToken && 
    nextUrl.href.includes('/account') || 
    nextUrl.href.includes('/checkout')
  ) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);
    const response = NextResponse.redirect(
      new URL(`${request.nextUrl.origin}/login`)
    );
    response.cookies.set({
        name: 'redirectAfterLoginUrl',
        value: nextUrl.pathname,
    });
    response.cookies.delete("token");
    return response;
  }

  if(!url.includes('/login') && request.cookies.has('redirectAfterLoginUrl')){
    const response = NextResponse.next();
    response.cookies.delete("redirectAfterLoginUrl");
    return response;
  }

  return NextResponse.next();
}