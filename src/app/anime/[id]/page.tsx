// anime/[id]/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAnimeByIdAction } from "@/services/anime/anime.service";
import AnimeDetailSection from "@/sections/AnimeDetailSection";

export default async function AnimeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id: string = (await params).id;
  const queryClient = new QueryClient();

  // Prefetch untuk SSR, tapi error handling di client
  try {
    await queryClient.prefetchQuery({
      queryKey: ["anime-detail", id],
      queryFn: () => getAnimeByIdAction(id),
    });
  } catch (error) {
    // Biarkan error, client akan handle
    console.log("Prefetch failed, client will retry");
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AnimeDetailSection animeId={id} />
    </HydrationBoundary>
  );
}