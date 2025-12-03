// src\app\anime\page.tsx (Modifikasi Kode)

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAnimeListAction } from "@/services/anime/anime.service";
import AnimeListSection from "@/sections/anime/list/AnimeListSection";
import type { AnimeQueryParams } from "@/models/anime.model";
import AnimeBannerSection from "@/sections/anime/list/AnimeBannerSection";

interface AnimePageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    sortBy?: string;
    sort?: "asc" | "desc";
    genres?: string;
  };
}

// Hapus default value di sini.
export default async function AnimePage({ searchParams }: AnimePageProps) {
    
    const resolvedSearchParams = await searchParams; 
    const { page, limit, search, sortBy, sort } = resolvedSearchParams;
    
    const initialQuery: AnimeQueryParams = {
        page: page ? Number(page) : 1, 
        limit: limit ? Number(limit) : 10,
        search: search || undefined,
        sortBy: sortBy || "createdAt",
        sort: sort || "desc",
    };

    const queryClient = new QueryClient();

    // TIDAK ADA TRY...CATCH DI SINI. Jika gagal, error dilempar.
    await queryClient.prefetchQuery({
        queryKey: ["anime-list", initialQuery],
        queryFn: () => getAnimeListAction(initialQuery),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <AnimeBannerSection />
            <AnimeListSection initialQuery={initialQuery} />
        </HydrationBoundary>
    );
}