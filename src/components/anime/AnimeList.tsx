"use client";

import AnimeCard from "./AnimeCard";
import type { Anime } from "@/models/anime.model";

interface AnimeListProps {
  items: Anime[];
  onEdit: (anime: Anime) => void;
  onDelete: (id: string) => void;
}

export default function AnimeList({ items, onEdit, onDelete }: AnimeListProps) {
  if (items?.length === 0) {
    return <p className="text-gray-500 col-span-full">Tidak ada anime.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-6">
      {items?.map((item) => (
        <AnimeCard
          key={item.id}
          anime={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
