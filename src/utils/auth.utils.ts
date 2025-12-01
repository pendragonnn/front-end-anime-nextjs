// src/utils/auth.utils.ts
"use server";

import { getAccessToken } from "@/utils/cookies.utils";
import { refreshAccessTokenAction } from "@/services/auth/auth.service"; // Pastikan path benar
import { isAxiosError } from "@/utils/error.utils";

/* =========================================
   WRAPPER: Auto refresh token when expired
 ========================================= */
export async function withAuth<T>(
  callback: (token: string) => Promise<T>
): Promise<T> {
  let token = await getAccessToken(); // 1. UPAYA AWAL: Ambil/Refresh Token Jika Hilang

  if (!token) {
    console.log("[Auth] Access token missing. Attempting refresh.");
    const refreshed = await refreshAccessTokenAction();
    if (!refreshed?.success || !refreshed.accessToken) {
      throw new Error("Unauthorized");
    }
    token = refreshed.accessToken;
  }

  if (!token) {
    throw new Error("Unauthorized: Final check failed.");
  }

  try {
    return await callback(token);
  } catch (err: unknown) {
    // 3. UPAYA KEDUA: Refresh dan Retry jika terjadi 401
    if (isAxiosError(err) && err.response?.status === 401) {
      console.warn(
        "[Auth] API responded with 401 (Token Expired). Initiating retry refresh."
      );
      const refreshed = await refreshAccessTokenAction();

      if (!refreshed?.success || !refreshed.accessToken) {
        throw new Error("Unauthorized");
      }

      console.log(
        "[Auth] Retry refresh successful. Retrying original request."
      );
      return callback(refreshed.accessToken);
    }
    throw err;
  }
}
