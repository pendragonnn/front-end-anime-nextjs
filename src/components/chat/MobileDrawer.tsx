"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import RoomList from "./RoomList";
import NewChatModal from "./NewChatModal";

export default function MobileRoomDrawer() {
  const [open, setOpen] = useState(false);
  const [newChatOpen, setNewChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Ensure component is mounted (for SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close drawer when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-md bg-white/10 hover:bg-white/20 active:bg-white/30 text-xl"
      >
        ☰
      </button>
    );
  }

  const drawerContent = open ? (
    <div
      className="fixed inset-0 z-[9999] h-screen pointer-events-auto"
    >
      {/* OVERLAY - More opaque on mobile to completely hide content */}
      <div
        className="absolute inset-0 bg-black/95 md:bg-black/60 backdrop-blur-sm transition-opacity duration-300 opacity-100"
        onClick={() => setOpen(false)}
      ></div>

      {/* DRAWER - Full width on mobile, 288px on desktop */}
      <div
        className="
          absolute top-0 left-0 h-full 
          w-full md:w-72
          bg-[#0d0f12]
          border-r border-white/10 
          shadow-2xl shadow-black/60
          transition-transform duration-300
          z-[10000]
          translate-x-0
        "
      >
        {/* Header with title, new chat button, and close button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111315]">
          <h2 className="text-lg font-semibold text-white">Percakapan</h2>

          <div className="flex items-center gap-2">
            {/* New Chat Button */}
            <button
              onClick={() => setNewChatOpen(true)}
              className="text-2xl text-blue-400 hover:text-blue-300 transition transform hover:scale-110"
            >
              ＋
            </button>

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* RoomList wrapper - hide header since we have our own */}
        <div className="h-[calc(100%-60px)] overflow-hidden">
          <RoomList hideHeader={true} />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md bg-white/10 hover:bg-white/20 active:bg-white/30 text-xl"
      >
        ☰
      </button>

      {/* Render drawer using Portal to document.body */}
      {drawerContent && createPortal(drawerContent, document.body)}

      {/* New Chat Modal */}
      <NewChatModal isOpen={newChatOpen} onClose={() => setNewChatOpen(false)} />
    </>
  );
}
