// src/app/chat/[id]/page.tsx
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import ChatRoomLoader from "@/components/chat/ChatRoomLoader";

interface ChatDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatDetailPage({ params }: ChatDetailPageProps) {
  const { id } = await params;

  return (
    <ChatRoomLoader roomId={id}>
      <div className="flex-1 overflow-hidden">
        <MessageList />
      </div>
      <ChatInput />
    </ChatRoomLoader>
  );
}