"use client";

import { logoutAction } from "@/services/auth/auth.service";

export default function HeaderClient({ loggedIn }: { loggedIn: boolean }) {
  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/";
  };

  if (!loggedIn) return <div className="w-20"></div>;

  return (
    <div className="w-20 flex justify-end">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-lg shadow active:scale-95 transition"
      >
        Logout
      </button>
    </div>
  );
}
