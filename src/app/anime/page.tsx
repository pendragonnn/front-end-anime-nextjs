"use client";

import { useEffect, useState, useCallback } from "react";
import type { Anime, Pagination } from "@/lib/types/anime";
import AnimeFormModal from "../components/anime/AnimeFormModal";
import AnimeList from "../components/anime/AnimeList";

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

  // ------ Debounce search ------
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(t);
  }, [search]);

  // ------ Fetch anime ------
  const loadAnime = useCallback(async () => {
    setLoadingPage(true);

    try {
      const res = await fetch(
        `/api/anime?page=${page}&limit=10&search=${debouncedSearch}`,
        { credentials: "include" }
      );

      const data = await res.json();

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
    if (debouncedSearch) setLoadingSearch(true);
    loadAnime();
  }, [loadAnime]);

  // ------ Delete anime ------
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus anime ini, Mas?")) return;

    const res = await fetch(`/api/anime/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Gagal menghapus anime");
      return;
    }

    loadAnime();
  };

  if (loadingPage && anime.length === 0)
    return <p className="text-center pt-10 text-gray-600">Loading anime...</p>;

  return (
    <div className="w-full mx-auto pt-5 px-4">
      {/* Header + Search + Add */}
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

        {/* BUTTON TAMBAH */}
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
      <AnimeList
        items={anime}
        onEdit={(item) => {
          setEditData(item);
          setOpenForm(true);
        }}
        onDelete={handleDelete}
      />

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

      {/* MODAL CREATE / EDIT */}
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
