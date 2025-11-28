import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.match(/accessToken=([^;]+)/)?.[1];

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";

  const res = await fetch(
    `${API_BASE_URL}/api/anime?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request) {
  const token = req.headers.get("cookie")?.match(/accessToken=([^;]+)/)?.[1];
  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/api/anime`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

