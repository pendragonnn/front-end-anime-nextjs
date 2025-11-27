// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  // Kalau NestJS balikin error (4xx/5xx), teruskan status & body apa adanya
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  // Kalau sukses, kita juga cukup teruskan responsenya
  return NextResponse.json(data, { status: res.status });
}
