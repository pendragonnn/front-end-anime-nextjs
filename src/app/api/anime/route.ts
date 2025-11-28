import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 10);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sortBy") || "createdAt";
  const sort = url.searchParams.get("sort") || "desc";

  const token = req.headers
    .get("cookie")
    ?.match(/accessToken=([^;]+)/)?.[1];

  const backendURL =
    `${API_BASE_URL}/api/anime` +
    `?page=${page}` +
    `&limit=${limit}` +
    `&search=${search}` +
    `&sortBy=${sortBy}` +
    `&sort=${sort}`;

  const res = await fetch(backendURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const backend = await res.json();

  const total = backend.total ?? backend.pagination?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json(
    {
      data: backend.data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filterQuery: {
        page,
        limit,
        search,
        sortBy,
        sort,
      },
    },
    { status: res.status }
  );
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
