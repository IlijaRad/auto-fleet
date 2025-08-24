import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { USER_COOKIE_NAME } from "./lib/definitions";

const protectedRoutes = ["/", "/my-vehicles"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const isLoggedIn = (await cookies()).get(USER_COOKIE_NAME)?.value;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (path === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
