import Image from "next/image";
import HomeSection from "@/sections/HomeSection";

export default function HomePage() {
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

        <HeroContent />
      </section>

      {/* UI yang butuh state client dipisahkan */}
      <HomeSection />
    </>
  );
}

// Masih Server Component, aman
function HeroContent() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white drop-shadow-md px-4 text-center">
      <p className="text-md sm:text-lg md:text-xl font-light">🎌</p>

      <h2 className="text-xl font-extrabold mb-2">Cari Anime Apa?</h2>

      <p className="text-sm font-light text-black/70">
        Langsung login atau daftar dulu ya, Mas 😁
      </p>
    </div>
  );
}
