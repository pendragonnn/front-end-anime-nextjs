"use server";

import { axiosInstance } from "@/utils/axios.utils";
import {
  setAuthCookies,
  clearAuthCookies,
  getRefreshToken,
} from "@/utils/cookies.utils";
import { isAxiosError } from "@/utils/error.utils";
import type { BackendErrorResponse } from "@/models/api-error.model";

/* ============================
   1. LOGIN
============================ */
export async function loginAction(email: string, password: string) {
  try {
    const res = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

    const { accessToken, refreshToken, user } = res.data.data;

    await setAuthCookies(accessToken, refreshToken);

    return { success: true, user };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const data = err.response?.data as BackendErrorResponse;
      return {
        error: data?.message || "Login gagal.",
      };
    }
    return { error: "Login gagal (error non-Axios)." };
  }
}

/* ============================
   2. REGISTER
============================ */
export async function registerAction(
  name: string,
  email: string,
  password: string
) {
  try {
    const res = await axiosInstance.post("/api/auth/register", {
      name,
      email,
      password,
    });

    const { user } = res.data.data;

    return { success: true, user };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const data = err.response?.data as BackendErrorResponse;
      return {
        error: data?.message || "Pendaftaran gagal.",
      };
    }
    return { error: "Pendaftaran gagal (error non-Axios)." };
  }
}

/* ============================
   3. LOGOUT
============================ */
export async function logoutAction() {
  await clearAuthCookies();
  return { success: true };
}

/* ============================
   4. REFRESH TOKEN MANUAL
============================ */
export async function refreshAccessTokenAction() {
  try {
    const rToken = await getRefreshToken();

    if (!rToken) {
      return { error: "Refresh token tidak ditemukan." };
    }

    const res = await axiosInstance.post("/api/auth/refresh-token", {
      refreshToken: rToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = res.data.data;

    await setAuthCookies(accessToken, newRefreshToken);

    return { success: true, accessToken };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const data = err.response?.data as BackendErrorResponse;
      await clearAuthCookies(); 
      return {
        error: data?.message || "Gagal refresh token.",
      };
    } // Hapus cookie juga untuk error non-Axios
    await clearAuthCookies(); 
    return { error: "Gagal refresh token (error non-Axios)." };
  }
}
