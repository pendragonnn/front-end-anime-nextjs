"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import AnimeList from "@/components/anime/AnimeList";
import AnimeFormModal from "@/components/anime/AnimeFormModal";
import AnimeToolbar from "@/components/anime/list/AnimeToolbar";
import Pagination from "@/components/anime/list/Pagination";

import { useDebounce } from "@/hooks/use-debounce.hook";

import {
  getAnimeListAction,
  createAnimeAction,
  updateAnimeAction,
  deleteAnimeAction,
  type AnimePayload,
} from "@/services/anime/anime.service";

import type {
  Anime,
  AnimeQueryParams,
  AnimeListResponse,
} from "@/models/anime.model";

import DeleteDialog from "@/components/anime/list/DeleteDialog";

export default function AnimeListSection({
  initialQuery,
}: {
  initialQuery: AnimeQueryParams;
}) {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter state
  const [page, setPage] = useState(initialQuery.page ?? 1);
  const [limit] = useState(initialQuery.limit ?? 10);
  const [search, setSearch] = useState(initialQuery.search ?? "");
  const [sortBy, setSortBy] = useState(initialQuery.sortBy ?? "createdAt");
  const [sort, setSort] = useState<"asc" | "desc">(initialQuery.sort ?? "desc");

  const debouncedSearch = useDebounce(search, 400);

  // Query params
  const queryParams = useMemo<AnimeQueryParams>(
    () => ({
      page,
      limit,
      search: debouncedSearch || undefined,
      sortBy,
      sort,
    }),
    [page, limit, debouncedSearch, sortBy, sort]
  );

  // Fetch list
  const { data, isLoading, isFetching } = useQuery<AnimeListResponse>({
    queryKey: ["anime-list", queryParams],
    queryFn: () => getAnimeListAction(queryParams),
    keepPreviousData: true,
  });

  const items = data?.items ?? [];
  const pagination = data?.pagination;

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingAnime, setEditingAnime] = useState<Anime | null>(null);

  // CRUD Mutations
  const createMutation = useMutation({
    mutationFn: (payload: AnimePayload) => createAnimeAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anime-list"] });
      setOpenModal(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; payload: AnimePayload }) =>
      updateAnimeAction(data.id, data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anime-list"] });
      setOpenModal(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAnimeAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anime-list"] });
    },
  });

  const handleModalSubmit = (payload: AnimePayload) => {
    if (modalMode === "create") {
      createMutation.mutate(payload);
    } else if (editingAnime) {
      updateMutation.mutate({ id: editingAnime.id, payload });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <AnimeToolbar
        search={search}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        sortBy={sortBy}
        sort={sort}
        onSortByChange={setSortBy}
        onSortChange={setSort}
        onCreate={() => {
          setModalMode("create");
          setEditingAnime(null);
          setOpenModal(true);
        }}
      />

      {!isLoading && (
        <AnimeList
          items={items}
          onEdit={(anime) => {
            setModalMode("edit");
            setEditingAnime(anime);
            setOpenModal(true);
          }}
          onDelete={(id) => setDeleteId(id)}
        />
      )}

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          hasNext={pagination.hasNextPage}
          loading={isFetching}
          onPrev={() => setPage((p) => p - 1)}
          onNext={() => setPage((p) => p + 1)}
        />
      )}

      <AnimeFormModal
        open={openModal}
        mode={modalMode}
        initialData={editingAnime || undefined}
        onClose={() => setOpenModal(false)}
        onSubmit={handleModalSubmit}
      />

      <DeleteDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (!deleteId) return;
          deleteMutation.mutate(deleteId);
          setDeleteId(null);
        }}
        title="Hapus Anime Ini?"
        description="Anime yang dihapus tidak bisa dikembalikan."
      />
    </div>
  );
}
