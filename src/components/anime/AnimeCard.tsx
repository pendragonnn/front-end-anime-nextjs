"use client";

import Image from "next/image";
import Link from "next/link";
import type { Anime } from "@/models/anime.model";
import { Pencil, Trash } from "lucide-react";

interface AnimeCardProps {
  anime: Anime;
  onEdit: (anime: Anime) => void;
  onDelete: (id: string) => void;
}

export default function AnimeCard({ anime, onEdit, onDelete }: AnimeCardProps) {
  return (
    <div className="
      bg-black/60
      border border-white/10 
      backdrop-blur-xl
      rounded-xl
      overflow-hidden
      shadow-md shadow-black/40
      hover:shadow-blue-900/40
      hover:border-blue-500/40
      transition-all duration-300
      hover:scale-[1.02]
      cursor-pointer flex flex-col
    ">

      {/* COVER */}
      <Link href={`/anime/${anime.id}`} className="relative h-48 w-full">
        <Image
          src={anime.cover || "https://i.pinimg.com/1200x/46/54/ad/4654ad188d74ebda707b3bb62659d456.jpg"}
          alt={anime.title}
          fill
          className="object-cover brightness-[0.85]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </Link>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/anime/${anime.id}`} className="flex-1 block">
          <h2 className="text-lg font-semibold text-white line-clamp-1">
            {anime.title}
          </h2>

          <p className="text-sm text-gray-400 line-clamp-2 mt-1">
            {anime.synopsis}
          </p>

          <p className="text-xs mt-2 text-blue-400">
            {anime.genres.join(", ")}
          </p>
        </Link>

        {/* BUTTONS */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onEdit(anime)}
            className="flex-1 bg-blue-600/20 text-blue-300 
                       border border-blue-500/30 
                       rounded-md py-1 text-sm 
                       hover:bg-blue-600/30 transition flex items-center justify-center gap-1"
          >
            <Pencil size={14} /> Edit
          </button>

          <button
            onClick={() => onDelete(anime.id)}
            className="flex-1 bg-red-600/20 text-red-300 
                       border border-red-500/30 
                       rounded-md py-1 text-sm 
                       hover:bg-red-600/30 transition flex items-center justify-center gap-1"
          >
            <Trash size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
