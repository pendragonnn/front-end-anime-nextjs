"use client";

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
    <div className="flex justify-center items-center gap-3 mt-8">
      <button
        disabled={page <= 1 || loading}
        onClick={onPrev}
        className="px-3 py-1 rounded border bg-white disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm">
        Page {page} / {totalPages}
      </span>

      <button
        disabled={page >= totalPages || loading || !hasNext}
        onClick={onNext}
        className="px-3 py-1 rounded border bg-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
