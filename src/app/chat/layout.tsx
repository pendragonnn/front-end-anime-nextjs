// src/app/chat/layout.tsx
import { ChatProvider } from "@/components/chat/ChatContext";
import { getAccessToken } from "@/utils/cookies.utils";
import { redirect } from "next/navigation";
import RoomList from "@/components/chat/RoomList";
import MobileChatHeader from "@/components/chat/MobileChatHeader";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAccessToken();
  if (!token) redirect("/");

  return (
    <ChatProvider>
      <div className="flex h-[calc(100vh-72px)] bg-black text-white relative">
        {/* Left Sidebar - Desktop Only */}
        <div className="hidden md:flex md:w-80 border-r border-white/10 flex-col">
          <RoomList />
        </div>

        {/* Right Side - Children */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <MobileChatHeader />
          {children}
        </div>
      </div>
    </ChatProvider>
  );
}