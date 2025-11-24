export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Avatar skeleton */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full skeleton-shimmer shrink-0" />

          {/* Name and URL skeleton */}
          <div className="flex-1 min-w-0">
            <div className="h-5 sm:h-6 skeleton-shimmer rounded mb-2 w-3/4" />
            <div className="h-3 sm:h-4 skeleton-shimmer rounded w-1/2" />
          </div>

          {/* Dropdown button skeleton */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full skeleton-shimmer shrink-0" />
        </div>

        {/* Footer skeleton */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="h-3 skeleton-shimmer rounded w-24" />
          <div className="h-8 skeleton-shimmer rounded-lg w-full sm:w-20" />
        </div>
      </div>
    </div>
  );
};
