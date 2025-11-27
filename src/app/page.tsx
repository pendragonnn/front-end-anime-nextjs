"use client";

import { useState } from "react";
import LoginModal from "./components/auth/LoginModal";
import Image from "next/image";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RegisterModal from "./components/auth/RegisterModal";

export default function HomePage() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <>
      <Header />

      {/* CONTENT */}
      <main className="w-full mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-10">
        {/* HERO SECTION */}
        <section className="relative w-full h-[350px] sm:h-[420px] md:h-[480px] overflow-hidden shadow-lg">
          <Image
            src="https://i.pinimg.com/736x/f1/b5/e3/f1b5e3ebd3fc9e685115d0b75410c8d0.jpg"
            fill
            priority
            alt="Hero"
            className="object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-blue-100/80"></div>

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white drop-shadow-md px-4 text-center">
            <p className="text-md sm:text-lg md:text-xl font-light">🎌</p>

            <h2 className="text-xl font-extrabold mb-2">Cari Anime Apa?</h2>

            <p className="text-sm font-light">Login dulu yaa</p>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setOpenLogin(true)}
                className="bg-transparent border text-white px-4 py-2 cursor-pointer shadow-lg transition-all active:scale-95"
              >
                Mulai Sekarang
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

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
