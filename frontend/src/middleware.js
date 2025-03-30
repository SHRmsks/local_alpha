import { NextResponse } from "next/server";

export default function middleware(r) {
  if (
    r.nextUrl.pathname.startsWith("/login") ||
    r.nextUrl.pathname.startsWith("/signup") ||
    r.nextUrl.pathname.startsWith("/confirmation")
  ) {
    return NextResponse.next();
  }

  if (r.cookies.get("session_token")) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", r.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|icons|images).*)",
  ],
};
