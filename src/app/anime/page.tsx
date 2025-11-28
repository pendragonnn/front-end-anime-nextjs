"use client";

import { useEffect, useState, useCallback } from "react";
import type { Anime } from "@/lib/types/anime";
import { Pagination } from "@/lib/types/anime";
import AnimeFormModal from "../components/anime/AnimeFormModal";

export default function AnimePage() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);

  const loadAnime = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/anime?page=${page}&limit=10`, {
        credentials: "include",
      });

      const data = await res.json();
      console.log("anime", data);

      setAnime(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Gagal memuat anime:", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // 🔁 Load anime setiap page berubah
  useEffect(() => {
    loadAnime();
  }, [loadAnime]);

  if (loading)
    return <p className="text-center pt-10 text-gray-600">Loading anime...</p>;

  return (
    <div className="max-w-3xl mx-auto pt-10 px-4">
      {/* Header + button tambah anime */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Anime List</h1>

        <button
          onClick={() => setOpenForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 active:scale-95 transition"
        >
          + Tambah Anime
        </button>
      </div>

      {/* LIST ANIME */}
      <div className="space-y-3">
        {anime?.length === 0 && (
          <p className="text-gray-500">Tidak ada anime.</p>
        )}

        {anime?.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-blue-200/50 rounded-xl shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {item.synopsis}
            </p>
            <p className="text-xs mt-1 text-blue-600">
              Genres: {item.genres.join(", ")}
            </p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {pagination && (
        <div className="flex justify-between mt-8">
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <p className="text-sm text-gray-600 pt-2">
            Page {pagination.page} / {pagination.totalPages}
          </p>

          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            disabled={!pagination.hasNextPage}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* MODAL ADD/EDIT */}
      <AnimeFormModal
        open={openForm}
        mode="create"
        onClose={() => setOpenForm(false)}
        onSuccess={loadAnime}
      />
    </div>
  );
}
