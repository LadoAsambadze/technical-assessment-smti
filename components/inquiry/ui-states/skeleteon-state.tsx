export const SkeletonState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((col) => (
        <div key={col} className="space-y-3">
          {/* Column header skeleton */}
          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <div className="h-5 bg-slate-200 rounded animate-pulse mb-2 w-24" />
            <div className="h-4 bg-slate-100 rounded animate-pulse w-16" />
          </div>

          {/* Card skeletons */}
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
            >
              <div className="h-4 bg-slate-200 rounded animate-pulse mb-3 w-3/4" />
              <div className="h-3 bg-slate-100 rounded animate-pulse mb-2 w-1/2" />
              <div className="h-3 bg-slate-100 rounded animate-pulse w-2/3" />
              <div className="mt-4 flex gap-2">
                <div className="h-6 bg-slate-100 rounded animate-pulse w-16" />
                <div className="h-6 bg-slate-100 rounded animate-pulse w-20" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
