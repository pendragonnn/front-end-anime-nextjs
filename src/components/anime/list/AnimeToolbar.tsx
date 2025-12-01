"use client";

import SearchInput from "./SearchInput";
import SortControls from "./SortControls";

interface Props {
  search: string;
  onSearch: (v: string) => void;

  sortBy: string;
  sort: "asc" | "desc";
  onSortByChange: (v: string) => void;
  onSortChange: (v: "asc" | "desc") => void;

  onCreate: () => void;
}

export default function AnimeToolbar({
  search,
  onSearch,
  sortBy,
  sort,
  onSortByChange,
  onSortChange,
  onCreate,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div className="flex-1">
        <SearchInput value={search} onChange={onSearch} />
      </div>

      <SortControls
        sortBy={sortBy}
        sort={sort}
        onSortByChange={onSortByChange}
        onSortChange={onSortChange}
        onCreate={onCreate}
      />
    </div>
  );
}
