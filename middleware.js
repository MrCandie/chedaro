import { NextResponse } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";

export const config = {
  matcher: [
    "/api/v1/organizations/:path*",
    "/api/v1/employee/:path*",
    "/api/v1/logs/:path*",
    "/api/v1/user/:path*",
  ],
};

export async function middleware(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthenticated" },
      {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }

  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );

    if (!payload.id) {
      return NextResponse.json(
        { message: "Invalid auth token" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("user", payload.id);
    requestHeaders.set("token", token);
    requestHeaders.set("usertype", payload.usertype);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Authentication failed", error: error.message },
      {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
