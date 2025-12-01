import { getAnimeByIdAction } from "@/services/anime/anime.service";

export default async function AnimeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id: string = (await params).id;
  const anime = await getAnimeByIdAction(id);

  if (!anime) {
    return (
      <div className="p-6 text-center text-gray-600">
                Anime tidak ditemukan.      {" "}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{anime.title}</h1>

      <p className="mt-4 text-gray-700">{anime.synopsis}</p>

      <div className="mt-4 flex gap-2 flex-wrap">
        {anime.genres.map((g) => (
          <span
            key={g}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            {g}
          </span>
        ))}
      </div>

      <p className="text-xs mt-4 text-gray-500">
        Dibuat: {new Date(anime.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
