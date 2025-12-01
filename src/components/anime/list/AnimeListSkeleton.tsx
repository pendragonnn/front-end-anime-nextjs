export default function AnimeListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-xl" />
      ))}
    </div>
  );
}
