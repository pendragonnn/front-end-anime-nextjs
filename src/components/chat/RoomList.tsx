"use client";

import { useChat } from "./ChatContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";
import NewChatModal from "./NewChatModal";
import clsx from "clsx";

export default function RoomList() {
  const router = useRouter();
  const { roomChats, currentRoomChat, currentUser, loading, fetchRoomChats } =
    useChat();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchRoomChats();
  }, [fetchRoomChats]);

  // Ambil user lawan bicara
  const getOtherUser = (users: any[]) =>
    users.find((u) => u.id !== currentUser?.id) ?? users[0];

  return (
    <div className="flex flex-col h-full bg-[#0d0f12] border-r border-white/5">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 bg-[#111315] backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white tracking-wide">
          Percakapan
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="text-2xl text-blue-400 hover:text-blue-300 transition transform hover:scale-110"
        >
          ＋
        </button>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto">
        {/* Empty */}
        {!loading && roomChats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <div className="text-4xl mb-2">💬</div>
            <p>Belum ada percakapan</p>
          </div>
        )}

        {/* Loading */}
        {loading && roomChats.length === 0 && (
          <div className="flex items-center justify-center h-full text-zinc-500">
            Memuat…
          </div>
        )}

        {/* ROOM ITEMS */}
        {roomChats.map((room) => {
          const other = getOtherUser(room.users);
          const active = currentRoomChat?.id === room.id;

          return (
            <div
              key={room.id}
              onClick={() => router.push(`/chat/${room.id}`)}
              className={clsx(
                "flex items-start gap-3 px-4 py-4 cursor-pointer border-b border-white/5 transition-all",
                "hover:bg-white/5 hover:backdrop-blur-sm",

                active &&
                  "bg-blue-600/20 border-l-4 border-blue-500 shadow-[inset_0_0_12px_rgba(59,130,246,0.4)]"
              )}
            >
              {/* AVATAR */}
              <div>
                {other.avatar ? (
                  <img
                    src={other.avatar}
                    className="w-11 h-11 rounded-full object-cover border border-white/10 shadow-md"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-semibold shadow-md">
                    {other.name[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-white font-medium truncate text-[15px]">
                    {other.name}
                  </p>

                  {room.lastMessage && (
                    <span className="text-[11px] text-zinc-500 whitespace-nowrap ml-2">
                      {formatDistanceToNow(new Date(room.lastMessage.createdAt), {
                        addSuffix: true,
                        locale: localeId,
                      })}
                    </span>
                  )}
                </div>

                <p className="text-sm text-zinc-400 truncate">
                  {room.lastMessage
                    ? room.lastMessage.type === "IMAGE"
                      ? "📷 Gambar"
                      : room.lastMessage.content
                    : "Belum ada pesan"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      <NewChatModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
