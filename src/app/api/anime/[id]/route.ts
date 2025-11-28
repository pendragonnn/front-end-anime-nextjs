import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";

// PATCH → update anime
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  const token = req.headers
    .get("cookie")
    ?.match(/accessToken=([^;]+)/)?.[1];

  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/api/anime/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// DELETE → hapus anime
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  const token = req.headers
    .get("cookie")
    ?.match(/accessToken=([^;]+)/)?.[1];

  const res = await fetch(`${API_BASE_URL}/api/anime/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
