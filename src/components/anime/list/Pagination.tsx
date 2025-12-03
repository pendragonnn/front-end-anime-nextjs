"use client";

import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  hasNext: boolean;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPages,
  hasNext,
  loading,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-4 mt-10">

      <Button
        variant="outline"
        disabled={page <= 1 || loading}
        onClick={onPrev}
        className="
          rounded-xl border-white/20 text-white hover:bg-white/10
          disabled:opacity-40 active:scale-95
        "
      >
        Prev
      </Button>

      <span className="text-gray-300 text-sm">
        Page <span className="font-semibold">{page}</span> / {totalPages}
      </span>

      <Button
        disabled={page >= totalPages || loading || !hasNext}
        onClick={onNext}
        className="
          bg-blue-600 hover:bg-blue-700 text-white rounded-xl
          disabled:opacity-40 active:scale-95
        "
      >
        Next
      </Button>
    </div>
  );
}
