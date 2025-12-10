"use client";

import { useQuery } from "@tanstack/react-query";
import { getAnimeByIdAction } from "@/services/anime/anime.service";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, BookmarkPlus, Share2 } from "lucide-react";
import AnimeEpisodeSection from "./AnimeEpisodeSection";

export default function AnimeDetailSection({ animeId }: { animeId: string }) {
  const {
    data: anime,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["anime-detail", animeId],
    queryFn: () => getAnimeByIdAction(animeId),
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="p-10 text-center text-white/70 animate-pulse">
        Loading detail anime...
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="p-10 text-center text-red-400">
        Anime tidak ditemukan.
      </div>
    );
  }

  return (
    <section className="w-full bg-black text-white">
      {/* ==================== BACKGROUND IMAGE ==================== */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={anime.cover || "https://i.pinimg.com/1200x/a9/b6/7c/a9b67cf912f18358c7b64d9a58103674.jpg"}
          alt={anime.title}
          fill
          className="object-cover brightness-[0.35]"
        />

        {/* Blur overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* ==================== HEADER CONTENT ==================== */}
        <div className="absolute bottom-10 left-6 md:left-16 max-w-3xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-xl">
            {anime.title}
          </h1>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {anime.genres.map((g) => (
              <Badge
                key={g}
                className="bg-blue-600/25 text-blue-300 border border-blue-500/30"
              >
                {g}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 px-6 py-5 text-base rounded-xl">
              <Play size={18} />
              Tonton
            </Button>

            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white rounded-xl px-6 py-5"
            >
              <BookmarkPlus size={18} />
            </Button>

            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white rounded-xl px-6 py-5"
            >
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* ==================== DETAIL CONTENT ==================== */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-12">
        {/* Sinopsis */}
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-blue-400">
            Sinopsis
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            {anime.synopsis}
          </p>
        </div>

        {/* Info Tambahan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Informasi</h3>
            <ul className="space-y-1 text-sm">
              <li>Rilis: --- (placeholder)</li>
              <li>Status: Ongoing / Finished (placeholder)</li>
              <li>Studio: --- (placeholder)</li>
              <li>Rating: ⭐ 4.8 (placeholder)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Detail</h3>
            <ul className="space-y-1 text-sm">
              <li>Tipe: Series</li>
              <li>Episode: --- (placeholder)</li>
              <li>Durasi: --- menit</li>
            </ul>
          </div>
        </div>

        <AnimeEpisodeSection
          episodes={Array.from({ length: 8 }).map((_, i) => ({
            id: i + 1,
            title: `Episode ${i + 1}`,
            thumbnail:
              "https://i.pinimg.com/1200x/6a/ef/73/6aef7395be0a545e797998b6d6baddd6.jpg",
            subtitle: "Placeholder Subtitle",
          }))}
        />
      </div>
    </section>
  );
}
