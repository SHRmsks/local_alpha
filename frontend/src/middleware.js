import { NextResponse } from "next/server";

export default function middleware(r) {
  if (
    r.nextUrl.pathname.startsWith("/login") ||
    r.nextUrl.pathname.startsWith("/signup")
  ) {
    return NextResponse.next();
  }
  console.log("1");

  if (r.cookies.get("session_token")) {
    console.log("2");
    return NextResponse.next();
  }
  console.log("3");
  return NextResponse.redirect(new URL("/login", r.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|icons|images).*)",
  ],
};
