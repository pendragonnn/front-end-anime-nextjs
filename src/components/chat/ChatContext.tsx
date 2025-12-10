// src/components/chat/ChatContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useTransition,
} from "react";

import type { RoomChat, RoomChatDetail, Message } from "@/models/chat.model";
import type { User } from "@/models/auth.model";

import {
  getAllRoomChatsAction,
  getRoomChatDetailAction,
  sendMessageAction,
  createRoomChatAction,
  uploadImageAction,
  getAccessTokenForSocketAction,
} from "@/services/chat/chat.service";

import {
  getAllUsersAction,
  getCurrentUserAction,
} from "@/services/user/user.service";

import { socketClient } from "@/utils/socket.utils";

interface ChatContextType {
  roomChats: RoomChat[];
  currentRoomChat: RoomChatDetail | null;
  currentUser: User | null;
  loading: boolean;
  error: string | null;

  fetchRoomChats: () => Promise<void>;
  selectRoomChat: (roomChatId: string) => Promise<void>;
  sendMessage: (content: string, type: "TEXT" | "IMAGE") => Promise<void>;
  createRoomChat: (userIds: string[]) => Promise<string | null>;
  uploadImage: (file: File) => Promise<string | null>;
  fetchUsers: (search?: string) => Promise<User[]>;
  clearError: () => void;
  hasUnread: (roomId: string, lastMessageDate?: string) => boolean;
  markAsRead: (roomId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [roomChats, setRoomChats] = useState<RoomChat[]>([]);
  const [currentRoomChat, setCurrentRoomChat] =
    useState<RoomChatDetail | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending] = useTransition();

  // ─────────────────────────────────────────────
  // INIT USER + SOCKET
  // ─────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const userRes = await getCurrentUserAction();
      if (userRes.success) setCurrentUser(userRes.data);

      const tokenRes = await getAccessTokenForSocketAction();
      if (tokenRes.success) {
        socketClient.connect(tokenRes.token);
      }
    };

    init();

    return () => {
      if (currentRoomChat) socketClient.leaveRoom(currentRoomChat.id);
      socketClient.disconnect();
    };
  }, []);

  // ─────────────────────────────────────────────
  // OPTIMISTIC MESSAGE HELPERS
  // ─────────────────────────────────────────────

  const addOptimisticMessage = useCallback(
    (content: string, type: "TEXT" | "IMAGE") => {
      if (!currentRoomChat || !currentUser) return null;

      const tempId = "temp-" + Date.now();

      const optimisticMsg: Message = {
        id: tempId,
        content,
        type,
        roomChatId: currentRoomChat.id,
        userId: currentUser.id,
        user: currentUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // @ts-ignore
        optimistic: true,
      };

      // Masukkan optimistic message ke paling atas (mirip WhatsApp)
      setCurrentRoomChat((prev) =>
        prev
          ? { ...prev, messages: [optimisticMsg, ...prev.messages] }
          : prev
      );

      return tempId;
    },
    [currentRoomChat, currentUser]
  );

  const replaceOptimisticMessage = useCallback((tempId: string, real: Message) => {
    setCurrentRoomChat((prev) =>
      prev
        ? {
          ...prev,
          messages: prev.messages.map((m) =>
            m.id === tempId ? { ...real, optimistic: false } : m
          ),
        }
        : prev
    );
  }, []);

  // ─────────────────────────────────────────────
  // REALTIME LISTENER
  // ─────────────────────────────────────────────
  useEffect(() => {
    const unsub = socketClient.onNewMessage((message) => {
      // 1️⃣ Replace optimistic message (matching by content + userId + room)
      if (message.userId === currentUser?.id) {
        const optimistic = currentRoomChat?.messages.find(
          (m) =>
            m.userId === currentUser.id &&
            m.roomChatId === message.roomChatId &&
            m.content === message.content &&
            m.id.startsWith("temp-")
        );

        if (optimistic) {
          replaceOptimisticMessage(optimistic.id, message);
          return; // prevent duplicate insert
        }
      }

      // 2️⃣ If message belongs to the open room → push to UI
      if (message.roomChatId === currentRoomChat?.id) {
        setCurrentRoomChat((prev) =>
          prev
            ? { ...prev, messages: [message, ...prev.messages] }
            : prev
        );
      }

      // 3️⃣ Update room list preview
      setRoomChats((prev) =>
        prev.map((room) =>
          room.id === message.roomChatId
            ? { ...room, lastMessage: message }
            : room
        )
      );
    });

    return unsub;
  }, [currentRoomChat, currentUser, replaceOptimisticMessage]);

  // ─────────────────────────────────────────────
  // AUTO JOIN ROOM WHEN CURRENT ROOM CHANGES
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!currentRoomChat) return;

    socketClient.joinRoom(currentRoomChat.id);

    return () => socketClient.leaveRoom(currentRoomChat.id);
  }, [currentRoomChat]);

  // ─────────────────────────────────────────────
  // FETCH ROOMS
  // ─────────────────────────────────────────────
  const fetchRoomChats = useCallback(async () => {
    setLoading(true);
    const res = await getAllRoomChatsAction();

    if (res.success) setRoomChats(res.data);
    else setError(res.error);

    setLoading(false);
  }, []);

  // ─────────────────────────────────────────────
  // SELECT A ROOM
  // ─────────────────────────────────────────────
  const selectRoomChat = useCallback(async (roomChatId: string) => {
    setLoading(true);
    const res = await getRoomChatDetailAction(roomChatId);

    if (res.success) {
      setCurrentRoomChat(res.data);
      // Mark as read when opening room
      markAsRead(roomChatId);
    } else {
      setError(res.error);
    }

    setLoading(false);
  }, []);

  // ─────────────────────────────────────────────
  // SEND MESSAGE (WITH OPTIMISTIC UPDATE)
  // ─────────────────────────────────────────────
  const sendMessage = useCallback(
    async (content: string, type: "TEXT" | "IMAGE") => {
      if (!currentRoomChat || !currentUser) return;

      // optimistic first
      const tempId = addOptimisticMessage(content, type);

      const res = await sendMessageAction({
        roomChatId: currentRoomChat.id,
        content,
        type,
      });

      if (!res.success) {
        // mark failed
        setCurrentRoomChat((prev) =>
          prev
            ? {
              ...prev,
              messages: prev.messages.map((m) =>
                m.id === tempId ? { ...m, failed: true } : m
              ),
            }
            : prev
        );
      }
    },
    [currentRoomChat, currentUser, addOptimisticMessage]
  );

  // ─────────────────────────────────────────────
  // CREATE CHAT ROOM
  // ─────────────────────────────────────────────
  const createRoomChat = useCallback(
    async (userIds: string[]) => {
      const res = await createRoomChatAction({ users: userIds });

      if (res.success) {
        await fetchRoomChats();
        return res.data.id;
      }

      setError(res.error);
      return null;
    },
    [fetchRoomChats]
  );

  // ─────────────────────────────────────────────
  // LOAD USER LIST
  // ─────────────────────────────────────────────
  const fetchUsers = useCallback(async (search?: string) => {
    const res = await getAllUsersAction(search);

    if (res.success) return res.data;

    setError(res.error);
    return [];
  }, []);

  // ─────────────────────────────────────────────
  // UPLOAD IMAGE
  // ─────────────────────────────────────────────
  const uploadImage = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadImageAction(formData);
    if (res.success) return res.data.url;

    setError(res.error);
    return null;
  }, []);

  // ─────────────────────────────────────────────
  // UNREAD TRACKING
  // ─────────────────────────────────────────────
  const hasUnread = useCallback((roomId: string, lastMessageDate?: string) => {
    if (!lastMessageDate) return false;

    const lastViewed = localStorage.getItem(`chat_last_viewed_${roomId}`);
    if (!lastViewed) return true; // Never viewed = unread

    return new Date(lastMessageDate) > new Date(lastViewed);
  }, []);

  const markAsRead = useCallback((roomId: string) => {
    localStorage.setItem(`chat_last_viewed_${roomId}`, new Date().toISOString());
  }, []);

  const clearError = () => setError(null);

  return (
    <ChatContext.Provider
      value={{
        roomChats,
        currentRoomChat,
        currentUser,
        loading: loading || isPending,
        error,
        fetchRoomChats,
        selectRoomChat,
        sendMessage,
        createRoomChat,
        uploadImage,
        fetchUsers,
        clearError,
        hasUnread,
        markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
