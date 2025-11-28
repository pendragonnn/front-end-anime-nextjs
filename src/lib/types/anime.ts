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

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface FilterQuery {
  page: number;
  limit: number;
  search: string | null;
  sort: string | null;
  sortBy: string | null;
  skip: number;
}

export interface ApiResponse<T> {
  message: string;
  error: string | null;
  statusCode: number;
  data: T;
  pagination: Pagination | null;
  filterQuery: FilterQuery | null;
}

export interface AnimeFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialData?: Anime | null;
  onClose: () => void;
  onSuccess: () => void;
}

export interface AnimeCardProps {
  anime: Anime;
  onEdit: (anime: Anime) => void;
  onDelete: (id: string) => void;
}

export type AnimeListResponse = ApiResponse<Anime[]>;

export type AnimeDetailResponse = ApiResponse<Anime>;