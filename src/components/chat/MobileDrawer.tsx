"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import RoomList from "./RoomList";

export default function MobileRoomDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md bg-white/10 hover:bg-white/20 active:bg-white/30 text-xl"
      >
        ☰
      </button>

      {/* FIX: Drawer must be fixed at global viewport level */}
      <div
        className={`fixed inset-0 z-99 h-screen ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* OVERLAY */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        ></div>

        {/* DRAWER */}
        <div
          className={`
            absolute top-0 left-0 h-full w-72 
            bg-[#16181d] 
            border-r border-white/10 
            shadow-2xl shadow-black/60
            transition-transform duration-300
            z-99
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Close Header */}
          <div className="flex justify-end p-3 border-b border-white/10 bg-[#1e2127]">
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-xl"
            >
              ✕
            </button>
          </div>

          {/* RoomList wrapper — FIX: beri background agar terlihat */}
          <div className="h-[calc(100%-56px)] overflow-y-auto bg-[#16181d]">
            <RoomList />
          </div>
        </div>
      </div>
    </>
  );
}
