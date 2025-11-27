import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const accessToken = req.headers
    .get("cookie")
    ?.match(/accessToken=([^;]+)/)?.[1];

  return NextResponse.json({
    loggedIn: Boolean(accessToken),
  });
}
