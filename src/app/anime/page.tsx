"use client";

import { useEffect, useState } from "react";
import type { Anime } from "@/lib/types/anime";
import { Pagination } from "@/lib/types/anime";

export default function AnimePage() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadAnime() {
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
    }

    loadAnime();
  }, [page]);

  if (loading)
    return (
      <p className="text-center pt-10 text-gray-600">Loading anime...</p>
    );

  return (
    <div className="max-w-3xl mx-auto pt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Anime List</h1>

      <div className="space-y-3">
        {anime.length === 0 && (
          <p className="text-gray-500">Tidak ada anime.</p>
        )}

        {anime.map((item) => (
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
    </div>
  );
}
