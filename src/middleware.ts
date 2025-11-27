import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  // Kalau user belum login → redirect ke landing page
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Tentukan route mana yang harus dilindungi
export const config = {
  matcher: ["/anime/:path*"], 
};
