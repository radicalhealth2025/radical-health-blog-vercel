export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex gap-4 mb-6">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        {/* Image skeleton */}
        <div className="w-full h-96 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>

        {/* Content skeleton */}
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
