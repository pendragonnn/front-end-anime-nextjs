import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;

  // Jika tidak ada token -> redirect ke landing page
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Proteksi semua route /anime
export const config = {
  matcher: ["/anime/:path*"],
};
