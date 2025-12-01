export default function AnimeDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6 animate-pulse">
      <div className="h-8 bg-gray-200 w-2/3 rounded" />
      <div className="h-4 bg-gray-200 w-full rounded mt-4" />
      <div className="h-4 bg-gray-200 w-full rounded mt-2" />
      <div className="h-4 bg-gray-200 w-4/5 rounded mt-2" />
    </div>
  );
}
