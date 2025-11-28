"use client";

import { useEffect, useState, useCallback } from "react";
import type { Anime, Pagination } from "@/lib/types/anime";
import AnimeFormModal from "../components/anime/AnimeFormModal";
import Image from "next/image";

export default function AnimePage() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [page, setPage] = useState(1);

  // search states
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Anime | null>(null);

  // 🔁 Debounce search (TIDAK bikin page re-render total)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(t);
  }, [search]);

  // FETCH anime
  const loadAnime = useCallback(async () => {
    // kalau pagination berubah → loading page
    setLoadingPage(true);

    try {
      const res = await fetch(
        `/api/anime?page=${page}&limit=10&search=${debouncedSearch}`,
        { credentials: "include" }
      );

      const data = await res.json();
      console.log("anime", data);

      setAnime(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Gagal memuat anime:", err);
    } finally {
      setLoadingPage(false);
      setLoadingSearch(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch) {
      setLoadingSearch(true);
    }
    loadAnime();
  }, [loadAnime]);

  if (loadingPage && anime.length === 0)
    return <p className="text-center pt-10 text-gray-600">Loading anime...</p>;

  return (
    <div className="w-full mx-auto pt-5 px-4">
      {/* Header + search + tambah */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">Anime List</h1>

        {/* SEARCH BAR */}
        <div className="flex items-center gap-2 w-full sm:w-72">
          <input
            type="text"
            placeholder="Cari anime..."
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loadingSearch && (
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
          )}
        </div>

        {/* TAMBAH */}
        <button
          onClick={() => {
            setEditData(null);
            setOpenForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 active:scale-95 transition"
        >
          + Tambah Anime
        </button>
      </div>

      {/* LIST ANIME */}
      <div className="grid grid-cols-1 xl:grid-cols-5 sm:grid-cols-3 gap-5 mt-6">
        {anime?.length === 0 && (
          <p className="text-gray-500 col-span-full">Tidak ada anime.</p>
        )}

        {anime?.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-blue-200/50 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex flex-col overflow-hidden"
          >
            <div
              className="h-40 w-full relative"
              onClick={() => (window.location.href = `/anime/${item.id}`)}
            >
              <Image
                src="https://i.pinimg.com/1200x/6a/ef/73/6aef7395be0a545e797998b6d6baddd6.jpg"
                alt="cover"
                fill
                className="object-cover"
              />
            </div>

            <div
              className="p-4 flex flex-col justify-between flex-1"
              onClick={() => (window.location.href = `/anime/${item.id}`)}
            >
              <h2 className="text-lg font-semibold line-clamp-1">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {item.synopsis}
              </p>

              <p className="text-xs mt-2 text-blue-600">
                {item.genres.join(", ")}
              </p>
            </div>

            {/* Action */}
            <div className="flex justify-between px-4 pb-4 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditData(item);
                  setOpenForm(true);
                }}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded text-sm"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Mas, di sini delete-nya nanti
                  console.log("delete:", item.id);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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

      <AnimeFormModal
        open={openForm}
        initialData={editData}
        mode={editData ? "edit" : "create"}
        onClose={() => setOpenForm(false)}
        onSuccess={loadAnime}
      />
    </div>
  );
}
