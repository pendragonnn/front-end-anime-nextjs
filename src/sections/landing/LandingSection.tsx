"use client";

import { useState } from "react";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LandingSection() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <Image
        src="https://i.pinimg.com/1200x/3a/7a/8c/3a7a8cb29509c88993c4415828253506.jpg"
        alt="Hero"
        fill
        priority
        className="object-cover object-center brightness-[0.45]"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* BLUE GLOW (very subtle) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[20rem] h-[20rem] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-[18rem] h-[18rem] bg-blue-500/10 blur-[140px] rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 min-h-screen">

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-xl leading-[1.15]">
          Dunia Anime  
          <span className="text-blue-400"> Terintegrasi</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-5 text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">
          Temukan, jelajahi, dan perdalam dunia anime favoritmu melalui platform yang
          dirancang untuk pengalaman modern, elegan, dan cepat.
        </p>

        {/* BUTTON GROUP */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">

          {/* CTA MAIN */}
          <Button
            onClick={() => setOpenLogin(true)}
            className="px-7 py-5 text-sm md:text-base rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-900/40"
          >
            Get Started
          </Button>

          {/* SECONDARY BUTTON */}
          <Button
            variant="ghost"
            className="px-7 py-5 text-sm md:text-base rounded-xl border border-white/30 text-white hover:bg-white/10 active:scale-95 flex items-center gap-2 backdrop-blur-sm"
          >
            Learn More
            <ArrowRight size={18} className="opacity-80" />
          </Button>

        </div>
      </div>

      {/* MODALS */}
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

    </section>
  );
}
