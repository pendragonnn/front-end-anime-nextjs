export interface Anime {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  synopsis: string;
  genres: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AnimeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string; // createdAt | title
  sort?: "asc" | "desc";
}

/* =========================
   LIST RESPONSE
========================= */
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AnimePayload {
  title: string;
  synopsis: string;
  genres: string[];
}

export interface AnimeFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialData?: Anime | null;
  onClose: () => void;
  onSubmit: (payload: AnimePayload) => void;
}

export interface AnimeListResponse {
  items: Anime[];
  pagination: Pagination;
  filterQuery: Record<string, unknown>;
}
