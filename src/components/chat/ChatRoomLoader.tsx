"use client";

import { useEffect } from "react";
import { useChat } from "./ChatContext";

export default function ChatRoomLoader({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) {
  const { selectRoomChat, loading, error } = useChat();

  useEffect(() => {
    selectRoomChat(roomId);
  }, [roomId, selectRoomChat]);

  // 🔵 Loading UI — smooth shimmer + blue glow
  if (loading) {
    return (
      <div className="
        flex flex-col items-center justify-center h-full 
        bg-[#0b0d10] text-zinc-400
      ">
        <div className="
          w-10 h-10 rounded-full border-4 
          border-zinc-700 border-t-blue-500 
          animate-spin mb-3
        " />
        <p className="text-sm tracking-wide">Memuat percakapan…</p>
      </div>
    );
  }

  // 🔴 Error UI — dark panel + warning accent
  if (error) {
    return (
      <div className="
        flex flex-col items-center justify-center h-full 
        bg-[#0b0d10]
        text-red-400
      ">
        <p className="text-sm font-medium">{error}</p>
        <p className="text-xs text-red-500/70 mt-1">
          Silakan coba lagi.
        </p>
      </div>
    );
  }

  // Normal
  return <>{children}</>;
}
