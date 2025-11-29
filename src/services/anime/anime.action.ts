"use server";

import { axiosInstance } from "@/utils/axios";
import { getAccessToken } from "@/utils/cookies";
import { refreshAccessTokenAction } from "../auth/auth.action";

export async function fetchProtectedAnime() {
  try {
    const token = await getAccessToken();

    const res = await axiosInstance.get("/anime", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      const refreshed = await refreshAccessTokenAction();

      if (!refreshed?.success) {
        return null; // expired completely
      }

      // Retry request
      const retry = await axiosInstance.get("/anime", {
        headers: {
          Authorization: `Bearer ${refreshed.accessToken}`,
        },
      });

      return retry.data.data;
    }

    throw error;
  }
}
