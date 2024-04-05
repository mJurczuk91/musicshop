import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    status: 200,
    headers: {"content-type": "application/json",},
  })

  response.cookies.delete({
    name: "token",
    path: "/",
  });

  return response;
}
