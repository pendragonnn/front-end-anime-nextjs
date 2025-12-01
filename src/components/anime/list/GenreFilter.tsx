"use client";

import { GENRES } from "@/constant/constants";

interface Props {
  selected: string[];
  onToggle: (genre: string) => void;
}

export default function GenreFilter({ selected, onToggle }: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {GENRES.map((g) => {
        const active = selected.includes(g);

        return (
          <button
            key={g}
            onClick={() => onToggle(g)}
            className={`px-3 py-1 rounded-full text-sm border ${
              active
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-700 border-blue-300"
            }`}
          >
            {g}
          </button>
        );
      })}
    </div>
  );
}
