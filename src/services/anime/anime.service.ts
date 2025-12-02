"use server";

import { axiosInstance } from "@/utils/axios.utils";
import { isAxiosError } from "@/utils/error.utils";
import { withAuth } from "@/utils/auth.utils";

import type {
  Anime,
  AnimeListResponse,
  AnimeQueryParams,
} from "@/models/anime.model";

/* =========================================
   BUILD QUERY (genres DIHAPUS TOTAL)
========================================= */
function buildAnimeQuery(params: AnimeQueryParams): string {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.search) searchParams.set("search", params.search);
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.sort) searchParams.set("sort", params.sort);

  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

/* =========================================
   1. GET LIST ANIME (PAGINATED)
========================================= */
export async function getAnimeListAction(
  params: AnimeQueryParams
): Promise<AnimeListResponse> {
  return withAuth(async (token) => {
    const query = buildAnimeQuery(params);

    const res = await axiosInstance.get(`/api/anime${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, pagination, filterQuery } = res.data;

    return {
      items: data,
      pagination,
      filterQuery,
    };
  });
}

/* =========================================
   2. GET ANIME BY ID
========================================= */
export async function getAnimeByIdAction(id: string) {
  return withAuth(async (token) => {
    const res = await axiosInstance.get(`/api/anime/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  });
}

/* =========================================
   PAYLOAD TYPE
========================================= */
export interface AnimePayload {
  title: string;
  synopsis: string;
  genres: string[];
}

/* =========================================
   3. CREATE ANIME
========================================= */
export async function createAnimeAction(payload: AnimePayload) {
  try {
    const created = await withAuth(async (token) => {
      const res = await axiosInstance.post("/api/anime", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data as Anime;
    });

    return { success: true, data: created };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ??
        "Gagal menambahkan anime.";
      return { success: false, error: msg };
    }

    return {
      success: false,
      error: "Gagal menambahkan anime (unknown error).",
    };
  }
}

/* =========================================
   4. UPDATE ANIME
========================================= */
export async function updateAnimeAction(
  animeId: string,
  payload: AnimePayload
) {
  try {
    const updated = await withAuth(async (token) => {
      const res = await axiosInstance.patch(`/api/anime/${animeId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data as Anime;
    });

    return { success: true, data: updated };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ??
        "Gagal memperbarui anime.";
      return { success: false, error: msg };
    }

    return {
      success: false,
      error: "Gagal memperbarui anime (unknown error).",
    };
  }
}

/* =========================================
   5. DELETE ANIME
========================================= */
export async function deleteAnimeAction(animeId: string) {
  try {
    await withAuth(async (token) => {
      await axiosInstance.delete(`/api/anime/${animeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    });

    return { success: true };
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ??
        "Gagal menghapus anime.";
      return { success: false, error: msg };
    }

    return {
      success: false,
      error: "Gagal menghapus anime (unknown error).",
    };
  }
}
