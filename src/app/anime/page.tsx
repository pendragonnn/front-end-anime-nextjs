export default function AnimePage() {
  return (
    <section className="relative w-full h-[350px] sm:h-[420px] md:h-[480px] overflow-hidden shadow-lg">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-blue-700 mb-4">
        Daftar Anime
      </h2>

      <p className="text-gray-600 mb-6">Kamu sudah berhasil login!</p>

      {/* Placeholder box */}
      <div className="bg-white border border-blue-200 p-6 rounded-xl shadow-sm text-center text-gray-500">
        <p>Belum ada data anime untuk ditampilkan.</p>
      </div>
    </section>
  );
}
