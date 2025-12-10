"use server";

import { axiosInstance } from "@/utils/axios.utils";
import { withAuth } from "@/utils/auth.utils";
import { isAxiosError } from "@/utils/error.utils";

/* =========================================
   MEDIA UPLOAD RESPONSE TYPE
========================================= */
export interface MediaUploadResponse {
  isDuplicate: boolean;
  id: string;
  url: string;
  key: string;
  hash: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

/* =========================================
   UPLOAD IMAGE
========================================= */
export async function uploadImageAction(file: File) {
  try {
    const uploaded = await withAuth(async (token) => {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post<{
        data: MediaUploadResponse;
      }>("/api/media/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data;
    });

    return { success: true, data: uploaded };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ??
        "Gagal mengupload gambar.";
      return { success: false, error: msg };
    }

    return {
      success: false,
      error: "Gagal mengupload gambar (unknown error).",
    };
  }
}
