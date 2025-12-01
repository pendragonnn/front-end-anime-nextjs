"use client";

import { useState, useEffect } from "react";
import type { AnimeFormModalProps } from "@/models/anime.model";
import { GENRES } from "@/constant/constants";

export default function AnimeFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit, // 🔥 now using parent mutation handler
}: AnimeFormModalProps) {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genreCandidate, setGenreCandidate] = useState("");

  const [error, setError] = useState("");

  // Prefill form saat EDIT
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setTitle(initialData.title);
      setSynopsis(initialData.synopsis || "");
      setSelectedGenres(initialData.genres ?? []);
    } else {
      setTitle("");
      setSynopsis("");
      setSelectedGenres([]);
    }

    setError("");
  }, [initialData, open]);

  if (!open) return null;

  // Handle genre add
  const addGenre = () => {
    if (!genreCandidate) return;
    if (!selectedGenres.includes(genreCandidate)) {
      setSelectedGenres((prev) => [...prev, genreCandidate]);
    }
    setGenreCandidate("");
  };

  const removeGenre = (g: string) => {
    setSelectedGenres((prev) => prev.filter((x) => x !== g));
  };

  // SUBMIT HANDLER (delegasi ke parent)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedGenres.length === 0) {
      setError("Minimal pilih 1 genre.");
      return;
    }

    const payload = {
      title,
      synopsis,
      genres: selectedGenres,
    };

    onSubmit(payload); // 🔥 kirim ke mutation dari parent
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">

        <h2 className="text-xl font-bold mb-4 text-blue-600">
          {mode === "create" ? "Tambah Anime" : "Edit Anime"}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-2 rounded mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Title */}
          <input
            type="text"
            placeholder="Judul Anime"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Synopsis */}
          <textarea
            placeholder="Sinopsis"
            className="border p-2 rounded"
            rows={3}
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
          />

          {/* Genre Picker */}
          <div className="flex gap-2">
            <select
              className="border p-2 rounded flex-1"
              value={genreCandidate}
              onChange={(e) => setGenreCandidate(e.target.value)}
            >
              <option value="">Pilih Genre</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={addGenre}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-95 transition"
            >
              Tambah
            </button>
          </div>

          {/* Selected Genres */}
          <div className="flex flex-wrap gap-2 mt-1">
            {selectedGenres.map((g) => (
              <span
                key={g}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {g}
                <button
                  type="button"
                  onClick={() => removeGenre(g)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          {/* Submit button */}
          <button
            className="bg-blue-600 text-white p-2 rounded shadow hover:bg-blue-700"
          >
            {mode === "create" ? "Tambah" : "Simpan Perubahan"}
          </button>
        </form>

        {/* Cancel */}
        <button
          className="mt-3 text-sm text-gray-600 hover:underline"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </div>
  );
}
