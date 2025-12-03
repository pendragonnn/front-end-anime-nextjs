"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";

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
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

      <Select value={sortBy} onValueChange={onSortByChange}>
        <SelectTrigger
          className="
            w-[180px] bg-white/5 border-white/20 text-white rounded-xl
            backdrop-blur-sm focus:ring-blue-500
          "
        >
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-black text-white border border-white/20">
          <SelectItem value="createdAt">Tanggal dibuat</SelectItem>
          <SelectItem value="title">Judul</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger
          className="
            w-[180px] bg-white/5 border-white/20 text-white rounded-xl
            backdrop-blur-sm focus:ring-blue-500
          "
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-black text-white border border-white/20">
          <SelectItem value="desc">Terbaru / Z-A</SelectItem>
          <SelectItem value="asc">Terlama / A-Z</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={onCreate}
        className="
          bg-blue-600 hover:bg-blue-700 
          text-white px-5 py-2 rounded-xl shadow 
          active:scale-95 whitespace-nowrap
        "
      >
        + Tambah Anime
      </Button>
    </div>
  );
}
