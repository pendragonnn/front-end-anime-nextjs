// src/services/user/user.service.ts
"use server";

import { axiosInstance } from "@/utils/axios.utils";
import { withAuth } from "@/utils/auth.utils";
import { isAxiosError } from "@/utils/error.utils";
import type { User } from "@/models/auth.model";
import type { BackendErrorResponse } from "@/models/api-error.model";

interface UserListResponse {
  message: string;
  error: string | null;
  statusCode: number;
  data: User[];
  total: number;
  params: any;
}

/* =========================================
   GET ALL USERS (for creating room chat)
========================================= */
export async function getAllUsersAction(search?: string) {
  try {
    const users = await withAuth(async (token) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);

      const res = await axiosInstance.get<UserListResponse>(
        `api/user?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    });

    return { success: true, data: users };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const data = err.response?.data as BackendErrorResponse;
      return {
        success: false,
        error: data?.message || "Gagal mengambil daftar user.",
      };
    }
    return {
      success: false,
      error: "Gagal mengambil daftar user (unknown error).",
    };
  }
}

/* =========================================
   GET CURRENT USER FROM TOKEN
========================================= */
export async function getCurrentUserAction() {
  try {
    const user = await withAuth(async (token) => {
      // Decode JWT to get user info (simple decode, no verification needed)
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      
      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      } as User;
    });

    return { success: true, data: user };
  } catch (err: unknown) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }
}