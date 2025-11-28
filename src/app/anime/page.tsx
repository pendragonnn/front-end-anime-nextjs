"use client";

import { useEffect, useState, useRef } from "react";
import { Pagination, type Anime } from "@/lib/types/anime";
import AnimeFormModal from "../components/anime/AnimeFormModal";
import AnimeList from "../components/anime/AnimeList";

export default function AnimePage() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [pagination, setPagination] = useState<Pagination>();

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [page, setPage] = useState(1);

  // Search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Filter
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Anime | null>(null);

  // Abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  // ---- Debounce Search ----
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ---- FETCH DATA ----
  async function loadAnime() {
    // Cancel request sebelumnya
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setLoadingPage(true);

    try {
      const res = await fetch(
        `/api/anime?page=${page}&limit=10&search=${debouncedSearch}&sortBy=${sortBy}&sort=${sortOrder}`,
        {
          credentials: "include",
          signal: abortControllerRef.current.signal,
        }
      );

      const data = await res.json();

      setAnime(data.data || []);
      setPagination(data.pagination || null);
    } catch (err) {
      if (err !== "AbortError") console.error(err);
    } finally {
      setLoadingPage(false);
      setLoadingSearch(false);
    }
  }

  // ---- Trigger fetch ----
  useEffect(() => {
    if (debouncedSearch) setLoadingSearch(true);
    loadAnime();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, debouncedSearch, sortBy, sortOrder]);

  // ---- Delete Anime ----
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus anime ini, Mas?")) return;

    const res = await fetch(`/api/anime/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Gagal menghapus anime");
      return;
    }

    loadAnime();
  };

  if (loadingPage && anime.length === 0) {
    return (
      <p className="text-center pt-10 text-gray-600">Loading anime...</p>
    );
  }

  return (
    <div className="w-full mx-auto pt-5 px-4">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">Anime List</h1>

        {/* SEARCH */}
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

        {/* FILTERS */}
        <div className="flex gap-2">
          <select
            value={sortBy}
            className="border p-2 rounded"
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="createdAt">Tanggal</option>
            <option value="title">Nama</option>
          </select>

          <select
            value={sortOrder}
            className="border p-2 rounded"
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1);
            }}
          >
            <option value="desc">Z → A / Terbaru</option>
            <option value="asc">A → Z / Terlama</option>
          </select>
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

      {/* LIST */}
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
            disabled={!pagination.hasPrevPage || loadingPage}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <p className="text-sm text-gray-600 pt-2">
            Page {pagination.page} / {pagination.totalPages}
          </p>

          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            disabled={!pagination.hasNextPage || loadingPage}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* MODAL */}
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
