export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl shadow-md border-b border-blue-200/40">
      <div className="relative py-4 flex justify-center items-center">
        {/* Decorative Glow Circle Behind Text */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-32 h-32 bg-blue-200/30 blur-3xl rounded-full"></div>
        </div>

        <h1 className="text-2xl font-bold text-black tracking-wide drop-shadow-sm relative z-10">
          Ohayō
        </h1>
      </div>

      {/* Decorative Gradient Line */}
      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
    </header>
  );
}

