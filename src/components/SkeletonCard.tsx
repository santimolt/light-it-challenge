export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <div className="p-6">
        <div className="flex items-center gap-4">
          {/* Avatar skeleton */}
          <div className="w-16 h-16 rounded-full skeleton-shimmer shrink-0" />
          
          {/* Name and URL skeleton */}
          <div className="flex-1 min-w-0">
            <div className="h-6 skeleton-shimmer rounded mb-2 w-3/4" />
            <div className="h-4 skeleton-shimmer rounded w-1/2" />
          </div>
          
          {/* Dropdown button skeleton */}
          <div className="w-10 h-10 rounded-full skeleton-shimmer shrink-0" />
        </div>
        
        {/* Footer skeleton */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="h-3 skeleton-shimmer rounded w-24" />
          <div className="h-8 skeleton-shimmer rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
};

