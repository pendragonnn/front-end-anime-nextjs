export default function ChatPage() {
  return (
    <div className="flex flex-1 items-center justify-center 
                    bg-[#0b0d10] text-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br 
                      from-blue-500/10 via-purple-500/10 to-transparent 
                      blur-3xl pointer-events-none" />

      {/* EMPTY STATE */}
      <div className="relative z-10 text-center max-w-sm">
        <div className="text-6xl mb-4">💬</div>

        <h3 className="text-2xl font-bold text-blue-300 drop-shadow">
          Pilih Percakapan
        </h3>

        <p className="text-gray-400 mt-2">
          Mulai obrolan baru atau pilih chat dari daftar.
        </p>

        {/* Small hint bubble */}
        <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 
                        backdrop-blur-xl text-sm text-gray-300">
          Ketuk tombol + pada sidebar untuk membuka percakapan.
        </div>
      </div>
    </div>
  );
}
