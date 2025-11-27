import { NextResponse } from "next/server";
import { LoginResponse } from "@/lib/types/auth";
import { API_BASE_URL } from "@/lib/constants";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data: LoginResponse = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const response = NextResponse.json({ user: data.data.user });

  // Set cookie HttpOnly
  response.cookies.set("accessToken", data.data.accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });

  response.cookies.set("refreshToken", data.data.refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
