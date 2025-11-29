"use client";

import { useState } from "react";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";

export default function HomeSection() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <div className="flex flex-col items-center mt-6">
      {/* Tombol Login */}
      <button
        onClick={() => setOpenLogin(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold hover:bg-blue-700 active:scale-95"
      >
        Login
      </button>

      {/* Tombol Register */}
      <button
        onClick={() => setOpenRegister(true)}
        className="mt-3 bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-800 active:scale-95"
      >
        Register
      </button>

      {/* MODAL */}
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onOpenRegister={() => {
          setOpenLogin(false);
          setOpenRegister(true);
        }}
      />

      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        onOpenLogin={() => {
          setOpenRegister(false);
          setOpenLogin(true);
        }}
      />
    </div>
  );
}
