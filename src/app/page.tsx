"use client";

import { useEffect, useState } from "react";
import LoginModal from "./components/auth/LoginModal";
import Image from "next/image";
import RegisterModal from "./components/auth/RegisterModal";

export default function HomePage() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch("/api/auth/check", { method: "GET" });
      const data = await res.json();
      setLoggedIn(data.loggedIn);
    };

    checkLogin();
  }, []);

  const handleStart = () => {
    if (loggedIn) {
      window.location.href = "/anime";
    } else {
      setOpenLogin(true);
    }
  };

  return (
    <>
      <section className="relative w-full h-[350px] sm:h-[420px] md:h-[480px] overflow-hidden shadow-lg">
        <Image
          src="https://i.pinimg.com/736x/f1/b5/e3/f1b5e3ebd3fc9e685115d0b75410c8d0.jpg"
          fill
          priority
          alt="Hero"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-blue-100/80"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white drop-shadow-md px-4 text-center">
          <p className="text-md sm:text-lg md:text-xl font-light">🎌</p>

          <h2 className="text-xl font-extrabold mb-2">Cari Anime Apa?</h2>

          <p className="text-sm font-light">
            {loggedIn ? "Yok Mas langsung masuk!" : "Login dulu yaa"}
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleStart}
              className="bg-transparent border text-white px-4 py-2 cursor-pointer shadow-lg transition-all active:scale-95"
            >
              {loggedIn ? "Masuk Sini" : "Mulai Sekarang"}
            </button>
          </div>
        </div>
      </section>

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onOpenRegister={() => setOpenRegister(true)}
      />

      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      />
    </>
  );
}
