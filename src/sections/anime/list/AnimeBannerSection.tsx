"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Info } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAnimeListAction } from "@/services/anime/anime.service";

export default function AnimeBannerSection() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3500 })]
  );

  // Fetch top 3 anime from database
  const { data, isLoading } = useQuery({
    queryKey: ["anime-banner"],
    queryFn: () => getAnimeListAction({
      page: 1,
      limit: 3,
      sortBy: "createdAt",
      sort: "desc"
    }),
  });

  const banners = data?.items?.map(anime => ({
    id: anime.id,
    title: anime.title,
    cover: anime.cover || "https://i.pinimg.com/1200x/46/54/ad/4654ad188d74ebda707b3bb62659d456.jpg",
    genres: anime.genres,
    synopsis: anime.synopsis,
  })) || [];

  // Show loading state
  if (isLoading || banners.length === 0) {
    return (
      <section className="w-full py-10 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-[300px] md:h-[420px] lg:h-[480px] rounded-xl bg-zinc-900 animate-pulse flex items-center justify-center">
            <p className="text-gray-500">Loading anime...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 bg-black">
      <div className="max-w-7xl mx-auto px-4">

        <div className="overflow-hidden rounded-xl shadow-lg" ref={emblaRef}>
          <div className="flex">

            {banners.map((item) => (
              <div
                key={item.id}
                className="
                  relative flex-[0_0_100%]
                  h-[300px] md:h-[420px] lg:h-[480px]
                  group cursor-pointer
                "
              >
                {/* BACKGROUND IMAGE */}
                <Image
                  src={item.cover}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover brightness-[0.55]"
                />

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* =================== NORMAL VIEW =================== */}
                <div
                  className="
                    absolute bottom-6 left-6
                    opacity-100 group-hover:opacity-0
                    transition-all duration-300
                  "
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">
                    {item.title}
                  </h3>
                </div>

                {/* =================== HOVER VIEW =================== */}
                <div
                  className="
                    absolute bottom-0 left-0 right-0 p-6 md:p-8
                    translate-y-20 opacity-0
                    group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-500
                    pointer-events-none group-hover:pointer-events-auto
                  "
                >
                  <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-xl">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-4 text-gray-300 mt-2">
                    <p className="text-sm">{item.genres.join(" • ")}</p>
                  </div>

                  <p className="text-gray-300 mt-3 max-w-2xl line-clamp-3">
                    {item.synopsis}
                  </p>

                  <div className="flex gap-4 mt-5">
                    <Link
                      href={`/anime/${item.id}`}
                      className="
                        flex items-center gap-2 
                        bg-blue-600 hover:bg-blue-700 
                        text-white px-5 py-3 rounded-xl text-sm font-semibold 
                        transition active:scale-95
                      "
                    >
                      <Info size={18} /> More Info
                    </Link>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
