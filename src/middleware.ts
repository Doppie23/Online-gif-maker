import { NextRequest, NextResponse } from "next/server";
import { pb } from "./lib/pocketbase";

export function middleware(request: NextRequest) {
  pb.authStore.loadFromCookie(request.headers.get("cookie") || "");
  if (!pb.authStore.isValid) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/",
};
