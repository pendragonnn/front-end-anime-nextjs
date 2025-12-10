"use client";

import { useChat } from "./ChatContext";
import MobileRoomDrawer from "./MobileDrawer";
import { useRouter } from "next/navigation";

export default function MobileChatHeader() {
  const { currentRoomChat, currentUser } = useChat();
  const router = useRouter();

  const getRoomName = () => {
    if (!currentRoomChat || !currentUser) return "Chat";
    const otherUser = currentRoomChat.users.find(
      (u) => u.id !== currentUser.id
    );
    return otherUser?.name || "Chat";
  };

  return (
    <div className="flex md:hidden items-center gap-3 p-3 border-b border-white/10 bg-black/80 backdrop-blur">
      {/* Back Button */}
      <button
        onClick={() => router.push("/chat")}
        className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-lg"
      >
        ←
      </button>

      {/* Drawer Button */}
      <MobileRoomDrawer />

      {/* Room Title */}
      <h2 className="text-lg font-semibold flex-1 truncate">
        {getRoomName()}
      </h2>
    </div>
  );
}
