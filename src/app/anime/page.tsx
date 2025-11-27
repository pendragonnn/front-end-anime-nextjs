export default function AnimePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">

      {/* CONTENT */}
      <main className="px-6 py-10 max-w-4xl mx-auto">
        
        {/* Title */}
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Daftar Anime</h2>

        <p className="text-gray-600 mb-6">
          Kamu sudah berhasil login! 
        </p>

        {/* Placeholder box */}
        <div className="bg-white border border-blue-200 p-6 rounded-xl shadow-sm text-center text-gray-500">
          <p>Belum ada data anime untuk ditampilkan.</p>
        </div>
      </main>
    </div>
  );
}
