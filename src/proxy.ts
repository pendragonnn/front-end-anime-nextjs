import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    // Redirect ke halaman login/landing page
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Proteksi semua route /anime
export const config = {
  matcher: ["/anime/:path*"],
};
