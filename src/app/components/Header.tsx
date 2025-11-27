"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Cek status login via /api/auth/check
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/check");
        const data = await res.json();
        setLoggedIn(data.loggedIn);
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    }

    checkAuth();
  }, []);

  // Logout via /api/auth/logout
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl shadow-md border-b border-blue-200/40">
      <div className="relative py-4 flex items-center justify-between px-6">

        {/* Left spacer biar center tetap simetris */}
        <div className="w-20"></div>

        {/* Title */}
        <div className="relative flex justify-center flex-1">
          <div className="absolute inset-0 flex justify-center">
            <div className="w-32 h-32 bg-blue-200/30 blur-3xl rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-black tracking-wide drop-shadow-sm relative z-10">
            Ohayō
          </h1>
        </div>

        {/* Logout button */}
        <div className="w-20 flex justify-end">
          {loggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-lg shadow active:scale-95 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
    </header>
  );
}

