"use client";

interface Props {
  sortBy: string;
  sort: "asc" | "desc";
  onSortByChange: (v: string) => void;
  onSortChange: (v: "asc" | "desc") => void;
  onCreate: () => void;
}

export default function SortControls({
  sortBy,
  sort,
  onSortByChange,
  onSortChange,
  onCreate,
}: Props) {
  return (
    <div className="flex gap-2">
      <select
        className="border p-2 rounded"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="createdAt">Tanggal dibuat</option>
        <option value="title">Judul</option>
      </select>

      <select
        className="border p-2 rounded"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
      >
        <option value="desc">Terbaru / Z-A</option>
        <option value="asc">Terlama / A-Z</option>
      </select>

      <button
        onClick={onCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 active:scale-95 transition"
      >
        + Tambah Anime
      </button>
    </div>
  );
}
