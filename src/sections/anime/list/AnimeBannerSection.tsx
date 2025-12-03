"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { PlayCircle, Info } from "lucide-react";
import Link from "next/link";

export default function AnimeBannerSection() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3500 })]
  );

  const banners = [
    {
      id: 1,
      title: "Demon Slayer: Kimetsu no Yaiba",
      img: "https://i.pinimg.com/1200x/87/c8/7e/87c87ebcf2c265d50de170ca202cdb72.jpg",
      rating: "8.7",
      genres: ["Action", "Adventure", "Fantasy"],
      synopsis:
        "Tanjiro berjuang melawan iblis sembari mencari cara mengembalikan adiknya menjadi manusia.",
    },
    {
      id: 2,
      title: "Attack on Titan",
      img: "https://i.pinimg.com/1200x/13/a1/01/13a10172127bbf9da50b8ce6db35eeaa.jpg",
      rating: "9.1",
      genres: ["Action", "Drama", "Mystery"],
      synopsis:
        "Manusia bertahan hidup di balik dinding raksasa untuk menghindari Titan yang mengancam dunia.",
    },
    {
      id: 3,
      title: "Jujutsu Kaisen",
      img: "https://i.pinimg.com/1200x/a2/e6/41/a2e641e94394781e5eda1a54a7307300.jpg",
      rating: "8.6",
      genres: ["Supernatural", "Action", "Dark Fantasy"],
      synopsis:
        "Yuji Itadori terjun ke dunia kutukan setelah memakan jari Sukuna, raja kutukan.",
    },
  ];

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
                  src={item.img}
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
                    <span className="text-blue-400 font-semibold text-lg">
                      ★ {item.rating}
                    </span>
                    <p className="text-sm">{item.genres.join(" • ")}</p>
                  </div>

                  <p className="text-gray-300 mt-3 max-w-2xl line-clamp-3">
                    {item.synopsis}
                  </p>

                  <div className="flex gap-4 mt-5">
                    <Link
                      href={`/anime/${item.id}/watch`}
                      className="
                        flex items-center gap-2 
                        bg-blue-600 hover:bg-blue-700 
                        text-white px-5 py-3 rounded-xl text-sm font-semibold 
                        transition active:scale-95
                      "
                    >
                      <PlayCircle size={20} /> Watch Now
                    </Link>

                    <Link
                      href={`/anime/${item.id}`}
                      className="
                        flex items-center gap-2 
                        px-5 py-3 rounded-xl text-sm font-semibold 
                        border border-white/30 hover:bg-white/10 
                        transition active:scale-95 backdrop-blur-sm text-white
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
