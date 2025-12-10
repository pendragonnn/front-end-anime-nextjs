// src/services/chat/chat.service.ts
"use server";

import { axiosInstance } from "@/utils/axios.utils";
import { withAuth } from "@/utils/auth.utils";
import { isAxiosError } from "@/utils/error.utils";
import type {
  RoomChat,
  RoomChatDetail,
  Message,
  CreateRoomChatDto,
  SendMessageDto,
  ChatApiResponse,
  UploadImageResponse,
} from "@/models/chat.model";
import type { BackendErrorResponse } from "@/models/api-error.model";

/* =========================================
   1. GET ALL ROOM CHATS
========================================= */
export async function getAllRoomChatsAction() {
  try {
    const rooms = await withAuth(async (token) => {
      const res = await axiosInstance.get<ChatApiResponse<RoomChat[]>>(
        "api/chat/room",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    });

    return { success: true, data: rooms };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const data = err.response?.data as BackendErrorResponse;
      return {
        success: false,
        error: data?.message || "Gagal mengambil daftar room chat.",
      };
    }
    return {
      success: false,
      error: "Gagal mengambil daftar room chat (unknown error).",
    };
  }
}

/* =========================================
   2. GET ROOM CHAT DETAIL BY ID
========================================= */
export async function getRoomChatDetailAction(roomChatId: string) {
  try {
    const room = await withAuth(async (token) => {
      const res = await axiosInstance.get<ChatApiResponse<RoomChatDetail>>(
        `api/chat/room/${roomChatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    });

    return { success: true, data: room };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const data = err.response?.data as BackendErrorResponse;
      return {
        success: false,
        error: data?.message || "Gagal mengambil detail room chat.",
      };
    }
    return {
      success: false,
      error: "Gagal mengambil detail room chat (unknown error).",
    };
  }
}

/* =========================================
   3. CREATE ROOM CHAT
========================================= */
export async function createRoomChatAction(payload: CreateRoomChatDto) {
  try {
    const room = await withAuth(async (token) => {
      const res = await axiosInstance.post<
        ChatApiResponse<{
          id: string;
          createdAt: string;
          updatedAt: string;
        }>
      >("api/chat/room", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    });

    return { success: true, data: room };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const data = err.response?.data as BackendErrorResponse;
      return {
        success: false,
        error: data?.message || "Gagal membuat room chat.",
      };
    }
    return {
      success: false,
      error: "Gagal membuat room chat (unknown error).",
    };
  }
}

/* =========================================
   4. SEND MESSAGE
========================================= */
export async function sendMessageAction(payload: SendMessageDto) {
  try {
    const message = await withAuth(async (token) => {
      const res = await axiosInstance.post<ChatApiResponse<Message>>(
        "api/chat/message",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    });

    return { success: true, data: message };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const data = err.response?.data as BackendErrorResponse;
      return {
        success: false,
        error: data?.message || "Gagal mengirim pesan.",
      };
    }
    return {
      success: false,
      error: "Gagal mengirim pesan (unknown error).",
    };
  }
}

/* =========================================
   5. UPLOAD IMAGE
========================================= */
export async function uploadImageAction(formData: FormData) {
  try {
    const image = await withAuth(async (token) => {
      const res = await axiosInstance.post<ChatApiResponse<UploadImageResponse>>(
        "api/media/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.data;
    });

    return { success: true, data: image };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const data = err.response?.data as BackendErrorResponse;
      return {
        success: false,
        error: data?.message || "Gagal upload gambar.",
      };
    }
    return {
      success: false,
      error: "Gagal upload gambar (unknown error).",
    };
  }
}

/* =========================================
   6. GET ACCESS TOKEN FOR SOCKET
   (Special endpoint to get token for WebSocket)
========================================= */
export async function getAccessTokenForSocketAction() {
  try {
    const token = await withAuth(async (token) => {
      return token;
    });

    return { success: true, token };
  } catch (err: unknown) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }
}