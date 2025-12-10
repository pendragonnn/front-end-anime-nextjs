"use client";

import { useChat } from "./ChatContext";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import Image from "next/image";

export default function MessageList() {
  const { currentRoomChat, currentUser } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const lastMessageCountRef = useRef(0);

  // Auto-scroll ketika ada pesan baru
  useEffect(() => {
    if (!scrollRef.current || !currentRoomChat) return;

    const messageCount = currentRoomChat.messages.length;
    const hasNewMessages = messageCount > lastMessageCountRef.current;
    lastMessageCountRef.current = messageCount;

    if (hasNewMessages && !isUserScrolling) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentRoomChat?.messages, isUserScrolling]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

    setIsUserScrolling(!isAtBottom);
  };

  if (!currentRoomChat) return null;

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex flex-col h-full overflow-y-auto px-4 py-4 bg-[#0b0d10]"
    >
      {currentRoomChat.messages
        .slice()
        .reverse()
        .map((message, idx) => {
          const isOwn = message.userId === currentUser?.id;
          const prevMessage = currentRoomChat.messages[currentRoomChat.messages.length - idx];
          const showAvatar =
            !isOwn && (!prevMessage || prevMessage.userId !== message.userId);

          return (
            <div
              key={message.id}
              className={`flex w-full mb-4 ${
                isOwn ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar Lawan Bicara */}
              {!isOwn && (
                <div className="mr-2 w-8 h-8 flex-shrink-0">
                  {showAvatar ? (
                    message.user?.avatar ? (
                      <img
                        src={message.user.avatar}
                        className="w-8 h-8 rounded-full object-cover shadow-md"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {message.user?.name?.charAt(0).toUpperCase() ?? "?"}
                      </div>
                    )
                  ) : (
                    <div className="w-8 h-8" /> // placeholder biar bubble sejajar
                  )}
                </div>
              )}

              {/* Bubble Chat */}
              <div
                className={`relative max-w-[70%] px-4 py-2 rounded-2xl shadow-sm transition-all ${
                  isOwn
                    ? "bg-blue-500 text-white rounded-br-sm"
                    : "bg-[#1b1f26] text-gray-200 rounded-bl-sm border border-white/10"
                }`}
              >
                {/* Image message */}
                {message.type === "IMAGE" ? (
                  <div className="relative w-52 h-52 rounded-xl overflow-hidden">
                    <Image
                      src={message.content}
                      alt="image"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <p className="whitespace-pre-line break-words">
                    {message.content}
                  </p>
                )}

                {/* Status (timestamp / sending / failed) */}
                <div className="flex justify-end mt-1">
                  {"failed" in message && message.failed && (
                    <span className="text-xs text-red-400">❌ Gagal</span>
                  )}

                  {message.optimistic && !message.failed && (
                    <span className="text-xs opacity-70">⏳ Mengirim...</span>
                  )}

                  {!message.optimistic && !message.failed && (
                    <span
                      className={`text-xs ${
                        isOwn ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      {format(new Date(message.createdAt), "HH:mm", {
                        locale: localeId,
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
