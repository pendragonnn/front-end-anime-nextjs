"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import AnimeFormModal from "@/app/components/anime/AnimeFormModal";
import type { Anime } from "@/models/anime.type";

export default function AnimeDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);

  const loadAnime = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/anime/${id}`, {
        credentials: "include",
      });

      const data = await res.json();
      setAnime(data.data || null);
    } catch (err) {
      console.error("Gagal mengambil detail anime:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnime();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Yakin hapus anime ini, Mas?")) return;

    const res = await fetch(`/api/anime/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Gagal menghapus anime");
      return;
    }

    router.push("/anime");
  };

  if (loading || !anime) {
    return (
      <p className="text-center pt-10 text-gray-600">
        {loading ? "Loading..." : "Anime tidak ditemukan."}
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-8 px-4">
      {/* COVER */}
      <div className="w-full h-64 relative rounded-xl overflow-hidden shadow">
        <Image
          src="https://i.pinimg.com/1200x/e0/3f/88/e03f88100f01e8835ab4f0eea3a65d64.jpg"
          alt="cover"
          fill
          className="object-cover"
          loading="eager"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mt-6">{anime.title}</h1>

      {/* GENRES */}
      <div className="mt-3 flex flex-wrap gap-2">
        {anime.genres.map((g) => (
          <span
            key={g}
            className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm"
          >
            {g}
          </span>
        ))}
      </div>

      {/* SYNOPSIS */}
      <p className="mt-6 text-gray-700 leading-relaxed">{anime.synopsis}</p>

      {/* Dates */}
      <p className="text-sm text-gray-400 mt-4">
        Dibuat: {new Date(anime.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-400 -mt-1">
        Diupdate: {new Date(anime.updatedAt).toLocaleString()}
      </p>

      {/* ACTIONS */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => setOpenForm(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Hapus
        </button>
      </div>

      {/* MODAL EDIT */}
      <AnimeFormModal
        open={openForm}
        initialData={anime}
        mode="edit"
        onClose={() => setOpenForm(false)}
        onSuccess={loadAnime}
      />
    </div>
  );
}
