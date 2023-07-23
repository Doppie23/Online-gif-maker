import { NextRequest, NextResponse } from "next/server";
import { pb } from "./lib/pocketbase";

export function middleware(request: NextRequest) {
  pb.authStore.loadFromCookie(request.headers.get("cookie") || "");
  if (!pb.authStore.isValid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // if (request.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/editor", request.url));
  // }
}

export const config = {
  matcher: ["/", "/editor"],
};
