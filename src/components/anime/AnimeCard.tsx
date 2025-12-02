"use client";

import Image from "next/image";
import Link from "next/link";
import type { Anime } from "@/models/anime.model";

interface AnimeCardProps {
  anime: Anime;
  onEdit: (anime: Anime) => void;
  onDelete: (id: string) => void;
}

export default function AnimeCard({ anime, onEdit, onDelete }: AnimeCardProps) {
  return (
    <div className="bg-white border border-blue-200/50 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex flex-col overflow-hidden">

      {/* Cover */}
      <Link href={`/anime/${anime.id}`} className="h-40 w-full relative block">
        <Image
          src="https://i.pinimg.com/1200x/6a/ef/73/6aef7395be0a545e797998b6d6baddd6.jpg"
          alt="cover"
          fill
          loading="eager"
          className="object-cover"
        />
      </Link>

      {/* Content */}
      <Link href={`/anime/${anime.id}`} className="p-4 flex flex-col justify-between flex-1 block">
        <h2 className="text-lg font-semibold line-clamp-1">{anime.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{anime.synopsis}</p>
        <p className="text-xs mt-2 text-blue-600">{anime.genres.join(", ")}</p>
      </Link>

      {/* Actions */}
      <div className="flex justify-between px-4 pb-4 gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(anime);
          }}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(anime.id);
          }}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded text-sm"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
