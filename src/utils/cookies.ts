"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  await cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  await cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  await cookieStore.delete("access_token");
  await cookieStore.delete("refresh_token");
}

export async function getAccessToken() {
  const store = await cookies();
  return store.get("access_token")?.value ?? null;
}

export async function getRefreshToken() {
  const store = await cookies();
  return store.get("refresh_token")?.value ?? null;
}
