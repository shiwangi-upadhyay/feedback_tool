import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const adminPath = path.startsWith("/admin");
  const token = request.cookies.get("token")?.value || "";

  if (adminPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      function getJwtSecretKey() {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT Secret key is not matched");
        return new TextEncoder().encode(secret);
      }
      const { payload } = await jwtVerify(token, getJwtSecretKey());
      if (!payload.isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};