"use client";

import Image from "next/image";

interface Episode {
  id: string | number;
  title: string;
  thumbnail: string;
  subtitle?: string;
}

export default function AnimeEpisodeSection({
  episodes,
}: {
  episodes: Episode[];
}) {
  return (
    <section className="w-full py-12 text-white">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          Episode
        </h2>

        {/* Grid episode */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {episodes.map((ep, i) => (
            <div
              key={ep.id}
              className="bg-white/5 border border-white/10 rounded-lg p-3 flex flex-col gap-2 hover:bg-white/10 transition cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-28 rounded overflow-hidden">
                <Image
                  src={ep.thumbnail}
                  alt={ep.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title */}
              <p className="text-sm font-semibold line-clamp-2">
                {ep.title}
              </p>

              {/* Subtitle */}
              <p className="text-xs text-gray-400">
                {ep.subtitle ?? "Subtitle Placeholder"}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
