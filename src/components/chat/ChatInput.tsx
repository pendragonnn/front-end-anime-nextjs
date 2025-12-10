"use client";

import { useState, useRef, FormEvent } from "react";
import { useChat } from "./ChatContext";

export default function ChatInput() {
  const { currentRoomChat, sendMessage, uploadImage } = useChat();
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!currentRoomChat) return null;

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message.trim(), "TEXT");
    setMessage("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Max 5MB");
      return;
    }

    try {
      setUploading(true);
      const url = await uploadImage(file);
      if (url) await sendMessage(url, "IMAGE");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="
        flex items-center gap-3 px-4 py-3
        bg-[#111315] border-t border-zinc-800
      "
    >
      {/* Upload Icon */}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="
          p-2 rounded-full 
          bg-zinc-800 hover:bg-zinc-700 
          transition text-zinc-300
        "
      >
        {uploading ? (
          <div className="w-5 h-5 border-[3px] border-zinc-400 border-t-blue-500 rounded-full animate-spin" />
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 15l4-4a2 2 0 012.828 0L17 18"
            />
          </svg>
        )}
      </button>

      <input
        ref={fileRef}
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Input Text */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ketik pesan…"
        className="
          flex-1 px-4 py-2 rounded-lg
          bg-zinc-900 border border-zinc-700
          text-white placeholder-zinc-500
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40
          outline-none transition
        "
      />

      {/* Send Button */}
      <button
        type="submit"
        disabled={!message.trim()}
        className="
          px-5 py-2 rounded-lg
          bg-blue-600 hover:bg-blue-700
          disabled:opacity-40
          text-white font-medium transition
        "
      >
        Send
      </button>
    </form>
  );
}
