"use client";

import { Mail, Instagram, Facebook, Twitter, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="w-full bg-black text-white py-24 px-6 relative overflow-hidden">

      {/* SOFT BLUE GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] left-[10%] w-[22rem] h-[22rem] bg-blue-700/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[20rem] h-[20rem] bg-blue-500/10 blur-[160px] rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
          Contact <span className="text-blue-400">OHAYŌ</span>
        </h2>

        <p className="text-gray-400 mt-3 mb-10 text-lg">
          Terhubung dengan kami dan ikuti update terbaru dari OHAYŌ.
        </p>

        {/* CONTACT INFO + SOCIAL MEDIA */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">

          {/* CONTACT INFO */}
          <div className="flex items-center gap-3 text-gray-300">
            <Phone className="text-blue-400" size={22} />
            <span>+62 812-3456-7890</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="text-blue-400" size={22} />
            <span>support@ohayo.id</span>
          </div>

        </div>

        {/* SOCIAL MEDIA ICONS */}
        <div className="flex justify-center gap-6 mt-10">

          <a
            href="#"
            className="text-gray-300 hover:text-blue-400 transition"
          >
            <Instagram size={28} />
          </a>

          <a
            href="#"
            className="text-gray-300 hover:text-blue-400 transition"
          >
            <Twitter size={28} />
          </a>

          <a
            href="#"
            className="text-gray-300 hover:text-blue-400 transition"
          >
            <Facebook size={28} />
          </a>

        </div>
      </div>

    </section>
  );
}
