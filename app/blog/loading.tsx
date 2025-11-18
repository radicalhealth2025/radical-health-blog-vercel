export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>

        {/* Filters skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 animate-pulse">
          <div className="flex gap-4">
            <div className="flex-1 h-10 bg-gray-200 rounded"></div>
            <div className="flex-1 h-10 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Blog cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
